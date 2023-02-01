// import { areDayPropsEqual } from "@mui/x-date-pickers/internals";
import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";

// function PdfViewerComponent({ document }: { document: any }) {
function PdfViewerComponent() {
  const { cvName } = useParams();
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    let instance, PSPDFKit: any;

    (async function () {
      PSPDFKit = await import("pspdfkit");
      instance = await PSPDFKit.load({
        renderPageCallback(ctx: any, pageIndex: any, pageSize: any) {
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(pageSize.width, pageSize.height);
          ctx.stroke();
          ctx.font = "30px Comic Sans MS";
          ctx.fillStyle = "red";
          ctx.textAlign = "center";
          ctx.fillText(
            `CREDOKS DIGITALS`,
            pageSize.width / 2,
            pageSize.height / 2
          );
        },
        container,
        // document: cvName,
        document: `http://localhost:3001/api/employees/cv/${cvName}`,
        // document: cvName,
        baseUrl: `${window.location.protocol}//${window.location.host}/${process.env.PUBLIC_URL}`,
      });

      //   const annotations = await instance.getAnnotations(0);
      //   const annotation = annotations.get(0);
      //   await instance.delete(annotation);

      //   console.log("Annotation deleted.");
    })();

    return () => PSPDFKit && PSPDFKit.unload(container);
  });
  return (
    <div>
      <Breadcrumbs />

      <div ref={containerRef} style={{ width: "100%", height: "100vh" }}></div>
    </div>
  );
}

export default PdfViewerComponent;
