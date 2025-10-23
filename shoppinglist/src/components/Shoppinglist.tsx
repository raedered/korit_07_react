import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getShoppings } from "../api/shoppingApi";

function Shoppinglist() {
  const queryClient = useQueryClient();
  const { data, error, isSuccess } = useQuery({
    queryKey: ["shoppings"],
    queryFn: getShoppings
  })

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
      <DataGrid
      </>
    )
  }
}