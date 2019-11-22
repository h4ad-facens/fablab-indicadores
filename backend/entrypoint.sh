#!/bin/bash

set -e

sleep 5

ls

cd ./Fablab.API/out/
dotnet Fablab.API.dll
