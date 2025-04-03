export async function handler(event, context) {
  const response = await fetch("https://api.zotero.org/groups/5937841/items/top?format=json");
  const data = await response.json();

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify(data)
  };
}