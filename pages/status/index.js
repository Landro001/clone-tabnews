import useSWR from "swr";

async function fetchApi(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchApi, {
    refreshInterval: 2000,
  });

  return (
    <>
      <h1>Status</h1>
      <UpdatedAt isLoading={isLoading} data={data} />

      <h1>Dependencias</h1>
      <DatabaseInfo isLoading={isLoading} data={data} />
    </>
  );
}

function UpdatedAt({ isLoading, data }) {
  let updatedAtText = "Carregando...";

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return <div>Última atualização: {updatedAtText}</div>;
}

function DatabaseInfo({ isLoading, data }) {
  return (
    <>
      <h2>Banco de Dados</h2>

      <ul>
        <li>
          <strong>Versão:</strong>
          {isLoading ? "Carregando..." : data.dependencies.database.version}
        </li>
        <li>
          <strong>Conexões máximas:</strong>
          {isLoading
            ? "Carregando..."
            : data.dependencies.database.max_connections}
        </li>
        <li>
          <strong>Conexões abertas:</strong>
          {isLoading
            ? "Carregando..."
            : data.dependencies.database.opened_connections}
        </li>
      </ul>
    </>
  );
}
