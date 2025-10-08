import { jsxs, jsx } from 'react/jsx-runtime';
import { isValidElement } from 'react';

const cleanHtmlText = (text) => {
  if (!text) return "";
  return text.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
};
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  try {
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
  } catch {
    return "Fecha inválida";
  }
};
const exportToExcelSimple = (data) => {
  try {
    if (!data || data.length === 0) {
      alert("❌ No hay datos para exportar");
      return;
    }
    const headers = ["ID", "Producto ID", "Nombre Producto", "Subtítulo", "Meta Título", "Meta Descripción", "Fecha Creación", "Párrafos", "Imágenes"];
    const csvRows = [
      headers.join(";"),
      ...data.map((blog) => [
        blog.id || "",
        blog.producto_id || "",
        `"${(blog.nombre_producto || "").replace(/"/g, '""')}"`,
        `"${(blog.subtitulo || "").replace(/"/g, '""')}"`,
        `"${(blog.etiqueta?.meta_titulo || "").replace(/"/g, '""')}"`,
        `"${(blog.etiqueta?.meta_descripcion || "").replace(/"/g, '""')}"`,
        blog.created_at ? new Date(blog.created_at).toLocaleDateString("es-ES") : "",
        blog.parrafos?.length || 0,
        blog.imagenes?.length || 0
      ].join(";"))
    ];
    const csvContent = csvRows.join("\n");
    const BOM = "\uFEFF";
    const blob = new Blob([BOM + csvContent], {
      type: "text/csv;charset=utf-8;"
    });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = `blogs_export_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.csv`;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    console.log("✅ CSV para Excel exportado exitosamente");
    alert(`✅ Se exportaron ${data.length} registros a CSV

Este archivo se abrirá automáticamente en Excel con el formato correcto.`);
  } catch (error) {
    console.error("❌ Error al exportar CSV para Excel:", error);
    alert("❌ Error al exportar");
  }
};
const exportToCSV = (data) => {
  try {
    if (!data || data.length === 0) {
      alert("❌ No hay datos para exportar");
      return;
    }
    const headers = [
      "ID",
      "Producto ID",
      "Nombre Producto",
      "Subtítulo",
      "Meta Título",
      "Meta Descripción",
      "Fecha Creación",
      "Fecha Actualización",
      "Número de Párrafos",
      "Número de Imágenes",
      "Primer Párrafo"
    ];
    const csvContent = [
      headers.join(","),
      ...data.map((blog) => {
        const primerParrafo = blog.parrafos && blog.parrafos.length > 0 ? cleanHtmlText(blog.parrafos[0].parrafo).substring(0, 100) + "..." : "";
        return [
          blog.id,
          blog.producto_id || "",
          `"${(blog.nombre_producto || "").replace(/"/g, '""')}"`,
          `"${(blog.subtitulo || "").replace(/"/g, '""')}"`,
          `"${(blog.etiqueta?.meta_titulo || "").replace(/"/g, '""')}"`,
          `"${(blog.etiqueta?.meta_descripcion || "").replace(/"/g, '""')}"`,
          formatDate(blog.created_at),
          formatDate(blog.updated_at),
          blog.parrafos?.length || 0,
          blog.imagenes?.length || 0,
          `"${primerParrafo.replace(/"/g, '""')}"`
        ].join(",");
      })
    ].join("\n");
    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;"
    });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `blogs_export_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.csv`);
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    console.log("✅ CSV exportado exitosamente");
    alert(`✅ Se exportaron ${data.length} registros a CSV`);
  } catch (error) {
    console.error("❌ Error al exportar CSV:", error);
    alert("❌ Error al exportar a CSV");
  }
};
const exportToPDF = (data) => {
  try {
    if (!data || data.length === 0) {
      alert("❌ No hay datos para exportar");
      return;
    }
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("❌ Por favor permite ventanas emergentes para generar el PDF");
      return;
    }
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Reporte de Blogs</title>
          <meta charset="utf-8">
          <style>
            body {
              font-family: 'Arial', 'Helvetica', sans-serif;
              margin: 0;
              padding: 20px;
              font-size: 11px;
              line-height: 1.3;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
              border-bottom: 2px solid #0ea5e9;
              padding-bottom: 20px;
            }
            .header h1 {
              color: #0ea5e9;
              margin: 0;
              font-size: 24px;
            }
            .header p {
              margin: 5px 0;
              color: #666;
              font-size: 12px;
            }
            .stats {
              display: flex;
              justify-content: center;
              gap: 30px;
              margin: 15px 0;
              padding: 10px;
              background-color: #f8f9fa;
              border-radius: 8px;
            }
            .stat-item {
              text-align: center;
            }
            .stat-number {
              font-size: 18px;
              font-weight: bold;
              color: #0ea5e9;
            }
            .stat-label {
              font-size: 10px;
              color: #666;
              text-transform: uppercase;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
              font-size: 10px;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 6px 4px;
              text-align: left;
              vertical-align: top;
            }
            th {
              background-color: #0ea5e9;
              color: white;
              font-weight: bold;
              text-align: center;
              font-size: 9px;
              text-transform: uppercase;
            }
            tr:nth-child(even) {
              background-color: #f9f9f9;
            }
            tr:hover {
              background-color: #f5f5f5;
            }
            .footer {
              margin-top: 30px;
              text-align: center;
              color: #666;
              border-top: 1px solid #ddd;
              padding-top: 20px;
              font-size: 10px;
            }
            .truncate {
              max-width: 150px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .id-cell {
              text-align: center;
              font-weight: bold;
              color: #0ea5e9;
            }
            .date-cell {
              text-align: center;
              font-size: 9px;
            }
            .number-cell {
              text-align: center;
              font-weight: bold;
            }
            @media print {
              body { 
                margin: 0; 
                padding: 15px;
              }
              .header { 
                margin-bottom: 20px; 
              }
              table {
                page-break-inside: auto;
              }
              tr {
                page-break-inside: avoid;
                page-break-after: auto;
              }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>📊 Reporte de Blogs</h1>
            <p><strong>Fecha de generación:</strong> ${(/* @__PURE__ */ new Date()).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })}</p>
            
            <div class="stats">
              <div class="stat-item">
                <div class="stat-number">${data.length}</div>
                <div class="stat-label">Total Blogs</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">${data.reduce((sum, blog) => sum + (blog.parrafos?.length || 0), 0)}</div>
                <div class="stat-label">Total Párrafos</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">${data.reduce((sum, blog) => sum + (blog.imagenes?.length || 0), 0)}</div>
                <div class="stat-label">Total Imágenes</div>
              </div>
            </div>
          </div>
          
          <table>
            <thead>
              <tr>
                <th style="width: 5%;">ID</th>
                <th style="width: 20%;">Producto</th>
                <th style="width: 25%;">Subtítulo</th>
                <th style="width: 20%;">Meta Título</th>
                <th style="width: 12%;">Fecha</th>
                <th style="width: 8%;">Párrafos</th>
                <th style="width: 10%;">Imágenes</th>
              </tr>
            </thead>
            <tbody>
              ${data.map((blog) => `
                <tr>
                  <td class="id-cell">${blog.id}</td>
                  <td class="truncate">${blog.nombre_producto || "Sin nombre"}</td>
                  <td class="truncate">${blog.subtitulo || ""}</td>
                  <td class="truncate">${blog.etiqueta?.meta_titulo || ""}</td>
                  <td class="date-cell">${formatDate(blog.created_at)}</td>
                  <td class="number-cell">${blog.parrafos?.length || 0}</td>
                  <td class="number-cell">${blog.imagenes?.length || 0}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
          
          <div class="footer">
            <p><strong>Sistema de Gestión de Blogs</strong></p>
            <p>© ${(/* @__PURE__ */ new Date()).getFullYear()} - Todos los derechos reservados</p>
            <p style="font-size: 9px; color: #999;">
              Documento generado automáticamente • ${(/* @__PURE__ */ new Date()).toISOString()}
            </p>
          </div>
        </body>
      </html>
    `;
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.focus();
        printWindow.print();
      }, 500);
    };
    console.log("✅ PDF generado exitosamente");
  } catch (error) {
    console.error("❌ Error al generar PDF:", error);
    alert("❌ Error al generar PDF");
  }
};
const printTable = (data) => {
  try {
    if (!data || data.length === 0) {
      alert("❌ No hay datos para imprimir");
      return;
    }
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("❌ Por favor permite ventanas emergentes para imprimir");
      return;
    }
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Imprimir Lista de Blogs</title>
          <meta charset="utf-8">
          <style>
            body { 
              font-family: Arial, sans-serif; 
              margin: 0; 
              padding: 15px;
              font-size: 11px;
            }
            .header {
              text-align: center;
              margin-bottom: 20px;
              border-bottom: 2px solid #333;
              padding-bottom: 10px;
            }
            .header h2 {
              margin: 0;
              color: #333;
            }
            .header p {
              margin: 5px 0;
              color: #666;
            }
            table { 
              width: 100%; 
              border-collapse: collapse; 
              font-size: 9px;
              margin-top: 15px;
            }
            th, td { 
              border: 1px solid #333; 
              padding: 4px 3px; 
              text-align: left;
              vertical-align: top;
            }
            th { 
              background-color: #f0f0f0; 
              font-weight: bold;
              text-align: center;
              font-size: 8px;
            }
            .id-cell { text-align: center; font-weight: bold; }
            .number-cell { text-align: center; }
            .date-cell { text-align: center; font-size: 8px; }
            .truncate {
              max-width: 120px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            @page {
              margin: 1cm;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>📋 Lista de Blogs</h2>
            <p><strong>Fecha:</strong> ${(/* @__PURE__ */ new Date()).toLocaleDateString("es-ES")}</p>
            <p><strong>Total de registros:</strong> ${data.length}</p>
          </div>
          
          <table>
            <thead>
              <tr>
                <th style="width: 8%;">ID</th>
                <th style="width: 25%;">Producto</th>
                <th style="width: 35%;">Subtítulo</th>
                <th style="width: 15%;">Fecha</th>
                <th style="width: 8%;">Párrafos</th>
                <th style="width: 9%;">Imágenes</th>
              </tr>
            </thead>
            <tbody>
              ${data.map((blog) => `
                <tr>
                  <td class="id-cell">${blog.id}</td>
                  <td class="truncate">${blog.nombre_producto || "Sin nombre"}</td>
                  <td class="truncate">${blog.subtitulo || ""}</td>
                  <td class="date-cell">${formatDate(blog.created_at)}</td>
                  <td class="number-cell">${blog.parrafos?.length || 0}</td>
                  <td class="number-cell">${blog.imagenes?.length || 0}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
          
          <div style="margin-top: 20px; text-align: center; font-size: 8px; color: #666;">
            <p>Sistema de Gestión de Blogs - ${(/* @__PURE__ */ new Date()).toLocaleDateString("es-ES")}</p>
          </div>
        </body>
      </html>
    `;
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.focus();
        printWindow.print();
        printWindow.close();
      }, 250);
    };
    console.log("✅ Tabla enviada a imprimir");
  } catch (error) {
    console.error("❌ Error al imprimir:", error);
    alert("❌ Error al imprimir");
  }
};

function TableContainer({
  children,
  tableType = "default",
  headerContent,
  exportData = [],
  onAddNew
}) {
  const handleExportCSV = () => {
    if (exportData.length === 0) {
      alert("No hay datos para exportar");
      return;
    }
    exportToCSV(exportData);
  };
  const handleExportExcel = () => {
    if (exportData.length === 0) {
      alert("No hay datos para exportar");
      return;
    }
    exportToExcelSimple(exportData);
  };
  const handleExportPDF = () => {
    if (exportData.length === 0) {
      alert("No hay datos para exportar");
      return;
    }
    exportToPDF(exportData);
  };
  const handlePrint = () => {
    if (exportData.length === 0) {
      alert("No hay datos para imprimir");
      return;
    }
    printTable(exportData);
  };
  const renderHeaderContent = () => {
    if (headerContent) return headerContent;
    switch (tableType) {
      case "blogs":
      case "productos":
      case "usuarios":
        return /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2 mb-4", children: [
          onAddNew && /* @__PURE__ */ jsx(
            "button",
            {
              onClick: onAddNew,
              className: "bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl font-semibold transition-colors",
              children: "PUBLICAR"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: handleExportCSV,
              className: "bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-xl font-semibold transition-colors",
              children: "EXPORTAR A CSV"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: handleExportExcel,
              className: "bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-xl font-semibold transition-colors",
              children: "EXPORTAR A EXCEL"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: handleExportPDF,
              className: "bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-xl font-semibold transition-colors",
              children: "EXPORTAR A PDF"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: handlePrint,
              className: "bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-xl font-semibold transition-colors",
              children: "IMPRIMIR"
            }
          )
        ] });
      default:
        return /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 mb-4", children: /* @__PURE__ */ jsx("button", { className: "bg-gray-600 text-white px-4 py-2 rounded-xl hover:bg-gray-700 transition-colors", children: "ACCIÓN GENÉRICA" }) });
    }
  };
  const tableChildren = [];
  const outsideChildren = [];
  (Array.isArray(children) ? children : [children]).forEach((child) => {
    if (isValidElement(child) && ["thead", "tbody", "tfoot", "tr"].includes(child.type || "")) {
      tableChildren.push(child);
    } else {
      outsideChildren.push(child);
    }
  });
  return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
    renderHeaderContent(),
    /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsx("table", { className: "min-w-full text-sm text-center border-separate border-spacing-x-2 border-spacing-y-2", children: tableChildren }) }),
    outsideChildren.length > 0 && /* @__PURE__ */ jsx("div", { className: "mt-2 space-y-2", children: outsideChildren })
  ] });
}

export { TableContainer as T };
