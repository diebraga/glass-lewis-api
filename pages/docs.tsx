import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import { GetServerSideProps } from "next";
import swaggerSpec from "../lib/swaggerSpec";

const ApiDocs = ({ spec }: { spec: any }) => (
  <div className="bg-white min-h-screen">
    <SwaggerUI spec={spec} />
  </div>
);

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      spec: swaggerSpec,
    },
  };
};

export default ApiDocs;
