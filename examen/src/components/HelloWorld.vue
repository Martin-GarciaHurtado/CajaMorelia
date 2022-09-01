<template>
  <v-container>
    <div class="my-3">
      <v-btn color="primary" rounded @click="agregar=true">
        Agregar cliente<v-icon>mdi-plus-circle</v-icon>
      </v-btn>
      <br>
    </div>
    <template>
      <v-simple-table dark>
        <template v-slot:default v-if="clientes">
          <thead>
            <tr>
              <th class="text-left">
                id
              </th>
              <th class="text-left">
                Name
              </th>
              <th class="text-left">
                rfc
              </th>
              <th>
                Informacion
              </th>
              <th>
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item,i) in clientes.data"
              :key="i"
            >
              <td>{{ item.id }}</td>
              <td>{{ item.attributes.nombre }}</td>
              <td>{{ item.attributes.rfc}}</td>
              <td><v-icon @click="Info(item.id)">mdi-information</v-icon></td>
              <td><v-icon @click="Update(item.id)">mdi-pencil</v-icon><v-icon @click="Delete(item.id)">mdi-delete</v-icon></td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </template>
    <template>
      <v-dialog v-model="info" width="1000">

      </v-dialog>
    </template>
    <template>
      <v-dialog v-model="agregar" width="1000">

      </v-dialog>
    </template>
    <template>
      <v-dialog v-model="editar" width="1000">

      </v-dialog>
    </template>
    <template>
      <v-dialog v-model="eliminar" width="1000">

      </v-dialog>
    </template>
  </v-container>
</template>

<script>
  import axios from "axios";

  export default {
    data () {
      return {
        clientes: null,
        cuenta: null,
        tipoCuenta: null,
        agregar: false,
        editar: false,
        eliminar: false,
        info: false
      }
    },
    methods: {
      Info(id){
        this.info = true
        console.log(id)
      },
      get_Clientes(){
        axios.get( 'http://localhost:1337/api/clientes' ).then( res => {
          console.log(res.data)
          this.clientes = res.data
        })
        .catch( e => {
          console.log(e)
        })
      },
      get_Cuenta(){
        axios.get( 'http://localhost:1337/api/cliente-cuentas/:id' ).then( res => {
          console.log(res.data)
          this.cuenta = res.data
        })
        .catch( e => {
          console.log(e)
        })
      },
      get_TipoCuenta(){
        axios.get( 'http://localhost:1337/api/tipo-cuentas/:id' ).then( res => {
          console.log(res.data)
          this.tipoCuenta = res.data
        })
        .catch( e => {
          console.log(e)
        })
      },
      Update(id){
        this.editar = true
        console.log(id)
      },
      Delete(id){
        this.eliminar = true
        console.log(id)
      },
    },
    created() {
      this.get_Clientes();
    }
  }
</script>
