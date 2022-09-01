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
      <v-dialog v-model="info" width="1200">
        <v-card>  
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-icon>mdi-account</v-icon>
            Informacion del usuario
            <v-spacer></v-spacer>
            <v-btn color="indigo darken-4" text @click="info = false"><v-icon>mdi-close</v-icon></v-btn>
          </v-card-actions>
          <v-divider></v-divider>
          <v-container>
            <template v-if="clientes">
            <v-row v-for="(item,i) in clientes.data" :key="i">
              <v-col cols="12" sm="6" md="4" class="text-center">
                <label>Nombre: </label>
                <label>{{ item.attributes.nombre }} {{item.attributes.apellido_paterno}} {{item.attributes.apellido_materno}}</label>
              </v-col>
              <v-col cols="12" sm="6" md="4" class="text-center">
                <label>RFC: </label>
                <label>{{ item.attributes.rfc }}</label>
              </v-col>
              <v-col cols="12" sm="6" md="4" class="text-center">
                <label>curp: </label>
                <label>{{ item.attributes.curp }}</label>
              </v-col>
            </v-row> 
          </template>
          <template v-if="cuenta">
            <v-row v-for="(item,i) in cuenta.data" :key="i">
              <v-col cols="12" sm="6" md="4" class="text-center">
                <label>Saldo actual: </label>
                <label>{{ item.attributes.saldo_actual }}</label>
              </v-col>
              <v-col cols="12" sm="6" md="4" class="text-center">
                <label>Fecha de contratacion: </label>
                <label>{{ item.attributes.fecha_contratacion }}</label>
              </v-col>
              <v-col cols="12" sm="6" md="4" class="text-center">
                <label>Fecha de ultimo movimiento: </label>
                <label>{{ item.attributes.fecha_ultimo_movimiento }}</label>
              </v-col>
            </v-row>    
          </template>
          <template v-if="tipoCuenta">
            <v-row v-for="(item,i) in tipoCuenta.data" :key="i">
              <v-spacer></v-spacer>
              <v-col cols="12" sm="6" md="4" class="text-center">
                <label>Tipo de cuenta: </label>
                <label>{{ item.attributes.nombre_cuenta }}</label>
              </v-col>
              <v-spacer></v-spacer>
            </v-row>
          </template>
          </v-container>
        </v-card>
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
        axios.get( 'http://localhost:1337/api/cliente-cuentas' ).then( res => {
          console.log(res.data)
          this.cuenta = res.data
        })
        .catch( e => {
          console.log(e)
        })
      },
      get_TipoCuenta(){
        axios.get( 'http://localhost:1337/api/tipo-cuentas' ).then( res => {
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
      this.get_Cuenta();
      this.get_TipoCuenta();
    }
  }
</script>
