"use client";

import { useOrders } from "@/hooks/order";
import { OrderHookType } from "@/model/order";
import { Box } from "@mui/material";

export default function Page() {
  const { data, error, isLoading, mutate }: OrderHookType = useOrders({});

  return (
    <div>
      <main>
        <Box sx={{ p: 2, border: "1px dashed grey" }}>Teste importação Mui</Box>
        <Box sx={{ p: 2, border: "1px dashed grey" }}>
          {JSON.stringify(data)}
        </Box>
      </main>
    </div>
  );
}
