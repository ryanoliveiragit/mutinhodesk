import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { formatDate } from '../../../utils/formData';
import { CalledsProps } from '../meusChamados';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 60 },
    { field: 'title', headerName: 'Chamado', width: 130 },
    { field: 'responsible', headerName: 'Responsável', width: 300 },
    { field: 'status', headerName: 'Status', width: 150 },
    {
      field: 'date',
      headerName: 'Data de abertura',
      description: 'Data que o chamado foi aberto',
      sortable: false,
      width: 260,
    },
  ];


  interface DataTableProps {
    rows: CalledsProps[];
  }

  

export default function DataTable({rows}:DataTableProps) {

    const rowsWithIds = rows.map((row) => ({
        ...row,
        id: row.idchamados,
        date: formatDate(row.date)
      }));

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rowsWithIds}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}
