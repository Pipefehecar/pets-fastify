import { FastifyInstance } from "fastify";
import { dynamoService } from "../services/dynamo";
import { ulid } from "ulid";

export default async function (fastify: FastifyInstance) {
  const tableName = process.env.DYNAMO_TABLE || "AnimalsTable";

  fastify.post("/", async (request, reply) => {
    const { foundationId, name, type, breed, status } = request.body as {
      foundationId: string;
      name: string;
      type: string;
      breed: string;
      status: string;
    };
    const id = ulid();
    const params = {
      TableName: tableName,
      Item: {
        PK: `FOUNDATION#${foundationId}`,
        SK: `PET#${id}`,
        id,
        name,
        type,
        breed,
        status,
      },
    };
    await dynamoService.createItem(params);
    return reply.code(201).send({ message: "Pet created", data: params.Item });
  });

  fastify.get("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const params = {
      TableName: tableName,
      IndexName: "IdIndex",
      KeyConditionExpression: "id = :id",
      ExpressionAttributeValues: {
        ":id": id,
      },
    };
    const result = await dynamoService.queryItems(params);
    if (!result.Items || result.Items.length === 0) {
      return reply.code(404).send({ message: "Pet not found" });
    }
    return reply.send({ data: result.Items[0] });
  });

  fastify.put("/:foundationId/:id", async (request, reply) => {
    const { foundationId, id } = request.params as {
      foundationId: string;
      id: string;
    };
    const { name, type, breed, status } = request.body as {
      name: string;
      type: string;
      breed: string;
      status: string;
    };
    const params = {
      TableName: tableName,
      Key: {
        PK: `FOUNDATION#${foundationId}`,
        SK: `PET#${id}`,
      },
      UpdateExpression:
        "SET #name = :name, #type = :type, #breed = :breed, #status = :status",
      ExpressionAttributeNames: {
        "#name": "name",
        "#type": "type",
        "#breed": "breed",
        "#status": "status",
      },
      ExpressionAttributeValues: {
        ":name": name,
        ":type": type,
        ":breed": breed,
        ":status": status,
      },
      ReturnValues: "UPDATED_NEW",
    };
    const result = await dynamoService.updateItem(params);
    return reply.send({ message: "Pet updated", data: result.Attributes });
  });

  fastify.delete("/:foundationId/:id", async (request, reply) => {
    const { foundationId, id } = request.params as {
      foundationId: string;
      id: string;
    };
    const params = {
      TableName: tableName,
      Key: {
        PK: `FOUNDATION#${foundationId}`,
        SK: `PET#${id}`,
      },
    };
    await dynamoService.deleteItem(params);
    return reply.send({ message: "Pet deleted" });
  });
}


