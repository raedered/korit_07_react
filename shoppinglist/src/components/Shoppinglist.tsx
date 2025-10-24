import { useQuery } from "@tanstack/react-query";
import { getShoppings } from "../api/shoppingApi";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { Shopping } from "../types";
import AddShopping from "./AddShopping";

function Shoppinglist() {
  const { data, error, isSuccess } = useQuery<Shopping[], Error>({
    queryKey: ["shoppings"],
    queryFn: getShoppings,
  });

  const columns: GridColDef[] = [
    {field: 'product', headerName: 'Product', width: 200},
    {field: 'amount', headerName: 'Amount', width: 200}
  ];
  
  if(!isSuccess) {
    return <span>Loading... 🔮</span>
  }

  if (error) {
    return <span>쇼핑리스트들을 불러오는 데 실패했습니다. 😱</span>
  }
  else {
    return (
      <>
        <AddShopping />
        <DataGrid 
          rows={data}
          columns={columns}
          getRowId={(row) => row.id!}
          slots={{toolbar:GridToolbar}}
        />
      </>
    )
  }
}

export default Shoppinglist;