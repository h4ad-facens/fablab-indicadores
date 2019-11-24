using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using Fablab.Data.BizLogic;
using Fablab.Data.Dtos.Member;
using Fablab.Data.Dtos.Student;
using Fablab.Data.Dtos.User;
using Fablab.Models;
using Fablab.Models.JWT;
using GenericBizRunner.Configuration;
using GenericServices.Configuration;
using GenericServices.Setup;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using NetCore.AutoRegisterDi;
using Swashbuckle.AspNetCore.Swagger;

namespace Fablab.API
{
    public class Startup
    {
        #region Constructors

        /// <summary>
        /// Construtor padrão
        /// </summary>
        public Startup(IConfiguration configuration) => Configuration = configuration;

        #endregion

        #region Protected Properties

        /// <summary>
        ///     A lista com as DTOs de alteração
        /// </summary>
        protected IEnumerable<Type> ChangeDTOs => new List<Type>
        {
            typeof(ChangeMemberDto),
            typeof(ChangeStudentDto),
            typeof(ChangeUserDTO),
        };

        /// <summary>
        ///     A lista com as Biz Logics
        /// </summary>
        protected IEnumerable<Type> BizLogics => new List<Type>
        {
            typeof(CreateMemberBizLogic),
            typeof(CreateStudentBizLogic),
            typeof(CreateUserDTO)
        };

        #endregion

        #region Public Properties

        /// <summary>
        ///     As configurações da aplicação
        /// </summary>
        public IConfiguration Configuration { get; }

        #endregion

        #region Public Methods

        /// <summary>
        ///     Método chamado para configurar os serviços da aplicação
        /// </summary>
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            ConfigureCORS(services);
            ConfigureDB(services);
            ConfigureCRUD(services);
            ConfigureSwagger(services);
            ConfigureJWT(services);
        }

        /// <summary>
        ///     Método chamado para realizar as configurações da aplicação
        /// </summary>
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            try {
                using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>()
                    .CreateScope()) {
                    serviceScope.ServiceProvider.GetService<FablabDBContext>().Database.Migrate();
                }
            }
            catch (Exception ex) {
                Console.WriteLine(ex);
            }

            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.), 
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c => { c.SwaggerEndpoint("/swagger/v1/swagger.json", "Fablab API"); });

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseCors("AllowAll");
            app.UseAuthentication();
            app.UseMvc();
        }

        #endregion

        /// <summary>
        ///     Método que configura e habilita o CORS
        /// </summary>
        protected void ConfigureCORS(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("AllowAll",
                    builder =>
                    {
                        builder
                            .AllowAnyOrigin()
                            .AllowAnyMethod()
                            .AllowAnyHeader()
                            .AllowCredentials();
                    });
            });
        }
        
        /// <summary>
        ///     Método que configura os serviços usados no CRUD
        /// </summary>
        protected void ConfigureCRUD(IServiceCollection services)
        {
            var defaultConfigs = new GenericServicesConfig
            {
                DtoAccessValidateOnSave = true, //This causes validation to happen on create/update via DTOs
                DirectAccessValidateOnSave = true, //This causes validation to happen on direct create/update and delete
                NoErrorOnReadSingleNull =
                    false //When working with WebAPI you should set this flag. Responce then sends 404 on null result
            };

            foreach (var type in ChangeDTOs)
                services.GenericServicesSimpleSetup<FablabDBContext>(defaultConfigs, Assembly.GetAssembly(type));

            foreach (var type in BizLogics)
            {
                services.RegisterBizRunnerWithDtoScans<FablabDBContext>(Assembly.GetAssembly(type));
                services.RegisterAssemblyPublicNonGenericClasses(Assembly.GetAssembly(type))
                    .AsPublicImplementedInterfaces();
            }
        }

        /// <summary>
        ///     Método que configura o banco de dados da aplicação
        /// </summary>
        protected void ConfigureDB(IServiceCollection services)
        {
            var connection = $"Server=172.23.0.1;Database=master;User=sa;Password=!!test!!fablab!!;";

            // This line uses 'UseSqlServer' in the 'options' parameter
            // with the connection string defined above.
            services.AddDbContext<FablabDBContext>(
                options => options.UseSqlServer(connection));
        }

        /// <summary>
        ///     Método que realiza as configurações do Swagger
        /// </summary>
        protected void ConfigureSwagger(IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info {Title = "Fablab API", Version = "v1"});

                //see https://docs.microsoft.com/en-us/aspnet/core/tutorials/getting-started-with-swashbuckle?view=aspnetcore-2.1&tabs=visual-studio%2Cvisual-studio-xml#xml-comments
                // Set the comments path for the Swagger JSON and UI.
                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);

                if (!File.Exists(xmlPath))
                    throw new InvalidOperationException(
                        "The XML file does not exist for Swagger - see link above for more info.");

                c.AddSecurityDefinition("Bearer",
                    new ApiKeyScheme
                    {
                        In = "Header",
                        Description = "É necessário inserir o JWT com Bearer na autorização",
                        Name = "Authorization",
                        Type = "apiKey"
                    });

                c.AddSecurityRequirement(new Dictionary<string, IEnumerable<string>>
                {
                    {"Bearer", Enumerable.Empty<string>()},
                });

                c.IncludeXmlComments(xmlPath);
            });
        }

        /// <summary>
        ///     Método que realiza as configurações do JWT
        /// </summary>
        protected void ConfigureJWT(IServiceCollection services)
        {
            var signingConfigurations = new SigningConfigurations();
            services.AddSingleton(signingConfigurations);

            var tokenConfigurations = new TokenConfigurations();

            new ConfigureFromConfigurationOptions<TokenConfigurations>(Configuration.GetSection("TokenConfigurations"))
                .Configure(tokenConfigurations);

            services.AddSingleton(tokenConfigurations);

            services.AddAuthentication(authOptions =>
            {
                authOptions.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                authOptions.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(bearerOptions =>
            {
                var paramsValidation = bearerOptions.TokenValidationParameters;
                paramsValidation.IssuerSigningKey = signingConfigurations.Key;
                paramsValidation.ValidAudience = tokenConfigurations.Audience;
                paramsValidation.ValidIssuer = tokenConfigurations.Issuer;

                // Valida a assinatura de um token recebido
                paramsValidation.ValidateIssuerSigningKey = true;

                // Verifica se um token recebido ainda é válido
                paramsValidation.ValidateLifetime = true;

                // Tempo de tolerância para a expiração de um token (utilizado
                // caso haja problemas de sincronismo de horário entre diferentes
                // computadores envolvidos no processo de comunicação)
                paramsValidation.ClockSkew = TimeSpan.Zero;
            });

            // Ativa o uso do token como forma de autorizar o acesso
            // a recursos deste projeto
            services.AddAuthorization(auth =>
            {
                auth.AddPolicy("Bearer", new AuthorizationPolicyBuilder()
                    .AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme)
                    .RequireAuthenticatedUser().Build());
            });
        }
    }
}