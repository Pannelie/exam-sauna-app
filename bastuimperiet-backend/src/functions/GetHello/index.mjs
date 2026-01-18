import "dotenv/config";

export const handler = async (event) => {
    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Hej från Bastuimperiet!" }),
    };
};
