"use client";

import Pagina from "@/app/components/template/Pagina";
import Titulo from "@/app/components/template/Titulo";
import FormularioUsuario from "@/app/components/usuario/FormularioUsuario";
import ListaUsuario from "@/app/components/usuario/ListaUsuario";
import Backend from "@/backend";
import { Usuario } from "@/core/model/Usuario";
import { IconPlus, IconUser } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export default function Page() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [usuario, setUsuario] = useState<Partial<Usuario> | null>(null);

  useEffect(() => {
    Backend.usuarios.obter().then(setUsuarios);
  }, []);

  async function salvar() {
    if (!usuario) return;
    await Backend.usuarios.salvar(usuario);
    const usuarios = await Backend.usuarios.obter();
    setUsuarios(usuarios);
    setUsuario(null);
  }

  async function excluir() {
    if (!usuario || !usuario.id) return;
    await Backend.usuarios.excluir(usuario.id);
    const usuarios = await Backend.usuarios.obter();
    setUsuarios(usuarios);
    setUsuario(null);
  }

  return (
    <Pagina className="flex flex-col gap-10 p-5">
      <Titulo
        icone={IconUser}
        principal="Usuarios"
        secundario="Cadastro usuarios"
      />

      {usuario ? (
        <FormularioUsuario
          usuario={usuario}
          onChange={setUsuario}
          salvar={salvar}
          cancelar={() => setUsuario(null)}
          excluir={excluir}
        />
      ) : (
        <>
          <div className="flex justify-end">
            <button
              className="flex items-center gap-2 bg-blue-500 px-4 py-2 rounded-md cursor-pointer"
              onClick={() => setUsuario({})}
            >
              <IconPlus />
              <span>Novo Usuario</span>
            </button>
          </div>

          <ListaUsuario usuarios={usuarios} onClick={setUsuario} />
        </>
      )}
    </Pagina>
  );
}
