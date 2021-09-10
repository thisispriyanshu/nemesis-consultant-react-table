import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table'
import {Link} from '@material-ui/core'
import { MuiThemeProvider, createMuiTheme, FormControlLabel, Switch } from '@material-ui/core'
function App() {
  const [preferDarkMode, setPreferDarkMode] = useState(() => {
    const mode = localStorage.getItem('_tableDarkMode')
    return mode === "true" || false
  })
  const [data, setData] = useState([])
  const columns = [
    { title: "ID", field: "id" },
    { title: "Username", field: "username" },
    { title: "Name", field: "name"},
    { title: "Email", field: "email" },
    { title: "Phone", field: "phone" },
    { title: "Website", field: 'website',render:rowData=><Link href={rowData.website} target="_blank">{rowData.website}</Link>}, 
  ]
  const theme = createMuiTheme({
    palette: {
      type: preferDarkMode ? 'dark' : 'light'
    }
  })

  const handleDarkModeChange = () => {
    setPreferDarkMode(!preferDarkMode)
    localStorage.setItem('_tableDarkMode', !preferDarkMode)
  }
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/")
      .then(resp => resp.json())
      .then(resp => {
        setData(resp)
      })
  }, [])

  return (
    <div className="App">
      <h1 align="center">Nemesis Consultants</h1>
      <h4 align='center'>React Material Table</h4>
      <FormControlLabel
        value="top"
        control={<Switch color="primary" checked={preferDarkMode} />}
        onChange={handleDarkModeChange}
        label="Dark Mode"
        labelPlacement="top"
      />
      <MuiThemeProvider theme={theme}>
      <MaterialTable
        title="User Data"
        data={data}
        columns={columns}
        editable={{
          onRowAdd: (newRow) => new Promise((resolve, reject) => {
            const updatedRows = [...data, { id: Math.floor(Math.random() * 100), ...newRow }]
            setTimeout(() => {
              setData(updatedRows)
              resolve()
            }, 2000)
          }),
          onRowDelete: selectedRow => new Promise((resolve, reject) => {
            const index = selectedRow.tableData.id;
            const updatedRows = [...data]
            updatedRows.splice(index, 1)
            setTimeout(() => {
              setData(updatedRows)
              resolve()
            }, 2000)
          }),
          onRowUpdate:(updatedRow,oldRow)=>new Promise((resolve,reject)=>{
            const index=oldRow.tableData.id;
            const updatedRows=[...data]
            updatedRows[index]=updatedRow
            setTimeout(() => {
              setData(updatedRows)
              resolve()
            }, 2000)
          })
         
        }}
        options={{
          actionsColumnIndex: -1, addRowPosition: "first"
        }}
      />
      </MuiThemeProvider>
      <a href="https://github.com/thisispriyanshu"> Created by Priyanshu Agrawal</a>
    </div>
  );
}

export default App;