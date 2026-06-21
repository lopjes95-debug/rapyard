import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

export async function handler(event) {
  const client = new SESClient({ region: "us-east-1" });

  const command = new SendEmailCommand({
    Source: "no-reply@rapyard.com",
    Destination: { ToAddresses: [event.email] },
    Message: {
      Subject: { Data: "RapYard Login Alert" },
      Body: { Text: { Data: `Login detected for ${event.email}` } }
    }
  });

  await client.send(command);
  return { statusCode: 200, body: "Email sent" };
}
