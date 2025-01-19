import { FastifyInstance } from "fastify";
import { ulid } from "ulid";
import { dynamoService } from "../services/dynamo";

export default async function (fastify: FastifyInstance) {
  const tableName = process.env.DYNAMO_TABLE || "AnimalsTable";

  fastify.post("/", async (request, reply) => {
    const { name, location } = request.body as {
      name: string;
      location: string;
    };
    const id = ulid();
    const params = {
      TableName: tableName,
      Item: {
        PK: `FOUNDATION#${id}`,
        SK: "INFO",
        id: id,
        name,
        location,
      },
    };
    await dynamoService.createItem(params);
    return reply
      .code(201)
      .send({ message: "Foundation created", data: params.Item });
  });

  fastify.get("/:id/pets", async (request, reply) => {
    const { id } = request.params as { id: string };
    const { type_, breed, name_ } = request.query as {
      type_?: string;
      breed?: string;
      name_?: string;
    };

    const attributeValues: Record<string, any> = {
      ":pk": `FOUNDATION#${id}`,
      ":sk": "PET#",
    };

    const attributeNames: Record<string, string> = {};
    const filterExpressions: string[] = [];

    if (type_) {
      attributeValues[":type"] = type_;
      attributeNames["#type"] = "type";
      filterExpressions.push("type = :type");
    }

    if (breed) {
      attributeValues[":breed"] = breed;
      filterExpressions.push("breed = :breed");
    }

    if (name_) {
      attributeValues[":name"] = name_;
      attributeNames["#name"] = "name";
      filterExpressions.push("contains(#name, :name)");
    }

    const params = {
      TableName: tableName,
      KeyConditionExpression: "PK = :pk AND begins_with(SK, :sk)",
      ExpressionAttributeValues: attributeValues,
      ExpressionAttributeNames:
        Object.keys(attributeNames).length > 0 ? attributeNames : undefined,
      FilterExpression:
        filterExpressions.length > 0
          ? filterExpressions.join(" AND ")
          : undefined,
    };

    const result = await dynamoService.queryItems(params);
    return reply.send({ data: result.Items });
  });
}
