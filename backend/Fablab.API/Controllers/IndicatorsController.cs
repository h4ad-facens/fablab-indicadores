using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Fablab.Data.Proxies;
using Fablab.Models;
using Fablab.Models.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Fablab.API.Controllers
{
    [Route("api/Indicators")]
    [ApiController]
    [Authorize]
    public class IndicatorsController : ControllerBase
    {
        /// <summary>
        ///     A referência para o banco de dados
        /// </summary>
        private readonly FablabDBContext _context;

        /// <summary>
        ///     Construtor padrão
        /// </summary>
        public IndicatorsController(FablabDBContext context)
        {
            _context = context;
        }

        /// <summary>
        ///     Método que retorna todos os indicadores
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<List<IndicatorsProxy>>> GetIndicators()
        {
            var list = new List<IndicatorsProxy>();
            var currentYear = DateTimeOffset.Now.Year;

            list.Add(await GetClassImpacted(currentYear));
            list.Add(await GetInvoiceByMonth(currentYear));
            
            return list;
        }
        
        /// <summary>
        ///     Método que retorna todos os indicadores para um gráfico
        /// </summary>
        /// <returns></returns>
        [HttpGet("Graph")]
        public async Task<ActionResult<IndicatorsGraphProxy>> GetIndicatorsGraph(int selectedYear)
        {
            var totalStudents = await _context.Set<Student>().CountAsync();
            var totalMembers = await _context.Set<Member>().CountAsync();
            var totalStudentsPerMonth = await GetClassImpacted(selectedYear);
            
            return new IndicatorsGraphProxy
            {
                TotalStudents = totalStudents,
                TotalMembers = totalMembers,
                TotalStudentsPerMonth = totalStudentsPerMonth
            };
        }

        /// <summary>
        ///     Método que retorna o número de alunos impactados
        /// </summary>
        /// <param name="selectedYear">O ano selecionado</param>
        /// <returns></returns>
        private async Task<IndicatorsProxy> GetClassImpacted(int selectedYear)
        {
            var data = await _context
                .Set<Student>()
                .Where(s => s.Date.Year == selectedYear)
                .GroupBy(s => s.Date.Month)
                .Select(s => new {Total = s.Count(), Month = s.Key})
                .ToDictionaryAsync(s => s.Month, s => s.Total);

            var defaultValue = 0;
            
            var indicator = new IndicatorsProxy
            {
                Name = "Nº de Alunos Impactados ( no ano ).",
                Goal = "-",
                January = data.TryGetValue(1, out var totalJanuary) ? totalJanuary : defaultValue,
                February = data.TryGetValue(2, out var totalFebruary) ? totalFebruary : defaultValue,
                March = data.TryGetValue(3, out var totalMarch) ? totalMarch : defaultValue,
                April = data.TryGetValue(4, out var totalApril) ? totalApril : defaultValue,
                May = data.TryGetValue(5, out var totalMay) ? totalMay : defaultValue,
                June = data.TryGetValue(6, out var totalJune) ? totalJune : defaultValue,
                July = data.TryGetValue(7, out var totalJuly) ? totalJuly : defaultValue,
                August = data.TryGetValue(8, out var totalAugust) ? totalAugust : defaultValue,
                September = data.TryGetValue(9, out var totalSeptember) ? totalSeptember : defaultValue,
                October = data.TryGetValue(10, out var totalOctober) ? totalOctober : defaultValue,
                November = data.TryGetValue(11, out var totalNovember) ? totalNovember : defaultValue,
                December = data.TryGetValue(12, out var totalDecember) ? totalDecember : defaultValue,
            };

            indicator.February += indicator.January;
            indicator.March += indicator.February;
            indicator.April += indicator.March;
            indicator.May += indicator.April;
            indicator.June += indicator.May;
            indicator.July += indicator.June;
            indicator.August += indicator.July;
            indicator.September += indicator.August;
            indicator.October += indicator.September;
            indicator.November += indicator.October;
            indicator.December += indicator.November;

            return indicator;
        }

        /// <summary>
        ///     Método que retorna a receita total de cada mes
        /// </summary>
        /// <param name="selectedYear">O ano selecionado</param>
        /// <returns></returns>
        private async Task<IndicatorsProxy> GetInvoiceByMonth(int selectedYear)
        {
            var data = await _context
                .Set<Student>()
                .Where(s => s.Date.Year == selectedYear)
                .GroupBy(s => s.Date.Month)
                .Select(s => new {Total = s.Sum(e => e.Invoice), Month = s.Key})
                .ToDictionaryAsync(s => s.Month, s => s.Total);

            var defaultValue = 0;
            
            var indicator = new IndicatorsProxy
            {
                Name = "Receita Total (Serviços + Treinamentos + Cursos + hora máquina)",
                Goal = "25k a 35k",
                January = data.TryGetValue(1, out var totalJanuary) ? totalJanuary : defaultValue,
                February = data.TryGetValue(2, out var totalFebruary) ? totalFebruary : defaultValue,
                March = data.TryGetValue(3, out var totalMarch) ? totalMarch : defaultValue,
                April = data.TryGetValue(4, out var totalApril) ? totalApril : defaultValue,
                May = data.TryGetValue(5, out var totalMay) ? totalMay : defaultValue,
                June = data.TryGetValue(6, out var totalJune) ? totalJune : defaultValue,
                July = data.TryGetValue(7, out var totalJuly) ? totalJuly : defaultValue,
                August = data.TryGetValue(8, out var totalAugust) ? totalAugust : defaultValue,
                September = data.TryGetValue(9, out var totalSeptember) ? totalSeptember : defaultValue,
                October = data.TryGetValue(10, out var totalOctober) ? totalOctober : defaultValue,
                November = data.TryGetValue(11, out var totalNovember) ? totalNovember : defaultValue,
                December = data.TryGetValue(12, out var totalDecember) ? totalDecember : defaultValue,
            };

            return indicator;
        }
    }
}