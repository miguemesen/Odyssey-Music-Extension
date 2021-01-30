
async function makeRequest(){
    let allRequest = await fetch(`http://localhost:3000/songs`, {
        method: 'GET',
        headers: {
            "Content-type": "application/json"
        }
    })
    .then(response => response.json())
    .then(json => json)
    console.log(allRequest[0].Track_Name)
    loadTableData(allRequest)
}
makeRequest()



// const items1 = [
//     { date: "10/17/2018", name: "john doe" },
//     { date: "10/18/2018", name: "jane doe" },
//   ];
//   const items2 = [
//     { date: "10/17/2019", name: "john doe" },
//     { date: "10/18/2019", name: "jane doe" },
//   ];
  function loadTableData(items) {
    const table = document.getElementById("testBody");
    items.forEach( item => {
      let row = table.insertRow();
      let Song_Name = row.insertCell(0);
      Song_Name.innerHTML = item.Track_Name;
      let Artist_Name = row.insertCell(1);
      Artist_Name.innerHTML = item.Artist_Name;
      let Song_ID = row.insertCell(2);
      Song_ID.innerHTML = item.Song_ID
    });
  }
//   loadTableData(items1);
//   loadTableData(items2);
//   loadTableData([]);