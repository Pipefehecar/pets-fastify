#!/bin/bash

echo "Inicializando la tabla DynamoDB..."

aws dynamodb create-table \
    --table-name AnimalsTable \
    --attribute-definitions AttributeName=PK,AttributeType=S AttributeName=SK,AttributeType=S \
    --key-schema AttributeName=PK,KeyType=HASH AttributeName=SK,KeyType=RANGE \
    --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 \
    --endpoint-url http://localhost:4566 \
    --region us-east-1

echo "Tabla DynamoDB 'AnimalsTable' creada con éxito."
