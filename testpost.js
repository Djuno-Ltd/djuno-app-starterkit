const getFiles = async () => {
  const myHeaders = new Headers();
  myHeaders.append("x-api-key", "e11487a90f0c479d84aa1ff93441dd9a");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
  };

  const res = await fetch(
    "https://ipfs-pastry-oriole.djuno.cloud/api/v0/files/ls?arg=/&long=true",
    requestOptions
  );
  const result = await res.json();
  return result.Entries;
};

getFiles().then(console.log);
