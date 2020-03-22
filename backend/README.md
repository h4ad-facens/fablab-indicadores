# Backend

Esse é a API que fornece os dados necessários para o projeto Frontend, desenvolvida em ASP .NET Core, foi utilizado uma organização de vários projetos diferentes dentro de uma unica solução para separar responsabilidades, sendo elas:
- Models: Contém as classes que representam as entidades e também as `migrations`.
- Data: Contém os `payloads` ( dados enviados pelo cliente ) e os `proxies` ( dados enviados pela API ), assim como `dtos` ( informações para alterar o estado da aplicação ).
- Base: Os arquivos essênciais para todos os projetos.
- API: Contém os `controllers` da aplicação, onde fornecerão uma camada pública de comunicação para a realização das operações `CRUD` ( Create, Replace, Update and Delete ).
