"use client";
import {
  Box,
  Button,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useOrdersInfinite } from "@/hooks/order";
import { Order } from "@/model/order";
import React, { useCallback, useMemo, useState } from "react";
import { TableComponents, TableVirtuoso } from "react-virtuoso";

export interface ColumnData {
  dataKey: keyof Order;
  label: string;
  width: number;
}

const VirtuosoTableComponents: TableComponents<Order> = {
  Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table
      {...props}
      sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
    />
  ),
  TableHead: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableHead {...props} ref={ref} />
  )),
  TableRow,
  TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

export default function OrderTable() {
  const { orders, isLoading, loadMore } = useOrdersInfinite();

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  function toggleRow(id: number) {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        const newArr = prev.filter((x) => x !== id);
        return newArr;
      } else {
        const newArr = [...prev, id];
        return newArr;
      }
    });
  }

  const columns: ColumnData[] = useMemo(
    () => [
      {
        width: 40,
        label: "ID",
        dataKey: "id",
      },
      {
        width: 100,
        label: "Customer name",
        dataKey: "customer_name",
      },
      {
        width: 200,
        label: "Email",
        dataKey: "customer_email",
      },
      {
        width: 100,
        label: "Review status",
        dataKey: "reviewState",
      },
      {
        width: 100,
        label: "Products",
        dataKey: "products",
      },
      {
        width: 40,
        label: "Status",
        dataKey: "status",
      },
    ],
    []
  );

  const fixedHeaderContent = useCallback(() => {
    return (
      <TableRow>
        <TableCell padding="checkbox" />
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            variant="head"
            style={{ width: column.width }}
            sx={{ backgroundColor: "background.paper" }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    );
  }, [columns]);

  const rowContent = useCallback(
    (_index: number, row: Order) => {
      const isSelected = selectedIds.includes(row.id);
      return (
        <>
          <TableCell padding="checkbox">
            <Checkbox checked={isSelected} onChange={() => toggleRow(row.id)} />
          </TableCell>
          {columns.map((column) => {
            const dataKey = column.dataKey as keyof Order;
            let cellContent: React.ReactNode;

            if (dataKey === "products" && Array.isArray(row.products)) {
              cellContent = `${row.products.length} product(s)`;
            } else if (dataKey === "status") {
              cellContent = row[dataKey] ? "Ativo" : "Inativo";
            } else if (dataKey === "reviewState") {
              switch (row[dataKey]) {
                case "A":
                  cellContent = "Aprovado";
                  break;
                case "R":
                  cellContent = "Rejeitado";
                  break;
                case "P":
                  cellContent = "Pendente";
                  break;
              }
            } else {
              cellContent = row[dataKey] as React.ReactNode;
            }

            return (
              <TableCell key={column.dataKey} sx={{ width: column.width }}>
                {cellContent}
              </TableCell>
            );
          })}
        </>
      );
    },
    [columns, selectedIds, toggleRow]
  );

  return (
    <Paper
      sx={{
        width: "1200px",
        height: "800px",
        overflow: "auto",
        borderRadius: "8px",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <Typography variant="h5">Products to review</Typography>
        <TableVirtuoso
          style={{ height: "100%", borderRadius: "8px" }}
          computeItemKey={(idx, order) => order.id}
          data={orders}
          components={VirtuosoTableComponents}
          fixedHeaderContent={fixedHeaderContent}
          itemContent={rowContent}
          endReached={loadMore}
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "end",
          gap: "16px",
        }}
      >
        <Button
          variant="outlined"
          size="small"
          sx={{ borderRadius: "8px", paddingX: 1 }}
        >
          Recusar
        </Button>
        <Button
          variant="contained"
          size="small"
          sx={{ borderRadius: "8px", paddingX: 1 }}
        >
          Aprovar
        </Button>
      </Box>
    </Paper>
  );
}
