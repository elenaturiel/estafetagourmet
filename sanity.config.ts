"use client";

/**
 * Configuración del panel de administración del blog (Sanity Studio),
 * accesible en /admin. Solo pueden entrar las personas invitadas al
 * proyecto en sanity.io/manage.
 */
import { esESLocale } from "@sanity/locale-es-es";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";

export default defineConfig({
  name: "estafeta-gourmet",
  title: "Estafeta Gourmet · Blog",
  basePath: "/admin",
  projectId,
  dataset,
  apiVersion,
  schema: { types: schemaTypes },
  plugins: [
    esESLocale(),
    structureTool({
      title: "Contenido",
      structure: (S) =>
        S.list()
          .title("Contenido")
          .items([
            S.listItem()
              .title("Entradas del blog")
              .schemaType("post")
              .child(S.documentTypeList("post").title("Entradas del blog")),
          ]),
    }),
  ],
});
