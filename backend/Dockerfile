FROM microsoft/dotnet:2.1-sdk
COPY . /app
WORKDIR /app

RUN ["dotnet", "restore"]
RUN cd ./Fablab.API && dotnet build -o ./out --configuration Release
RUN chmod +x ./entrypoint.sh

CMD /bin/bash ./entrypoint.sh
