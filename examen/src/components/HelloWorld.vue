<template>
  <v-container>
    <div v-if="error">
      {{ error }}
    </div>
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
              v-for="item in clientes.data"
              :key="item.id"
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
      <v-dialog v-model="info" width="1200" persistent>
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
            <template>
            <v-row >
              <v-col cols="12" sm="6" md="4" class="text-center">
                <label>Nombre: </label>
                <label>{{ this.nombre }} {{this.apellido_paterno}} {{this.apellido_materno}}</label>
              </v-col>
              <v-col cols="12" sm="6" md="4" class="text-center">
                <label>RFC: </label>
                <label>{{ this.rfc }}</label>
              </v-col>
              <v-col cols="12" sm="6" md="4" class="text-center">
                <label>curp: </label>
                <label>{{ this.curp }}</label>
              </v-col>
            </v-row> 
          </template>
          <template>
            <v-row>
              <v-col cols="12" sm="6" md="4" class="text-center">
                <label>Saldo actual: </label>
                <label>{{ this.saldo_actual }}</label>
              </v-col>
              <v-col cols="12" sm="6" md="4" class="text-center">
                <label>Fecha de contratacion: </label>
                <label>{{ this.fecha_contratacion }}</label>
              </v-col>
              <v-col cols="12" sm="6" md="4" class="text-center">
                <label>Fecha de ultimo movimiento: </label>
                <label>{{ this.fecha_ultimo_movimiento }}</label>
              </v-col>
            </v-row>    
          </template>
          <template>
            <v-row>
              <v-spacer></v-spacer>
              <v-col cols="12" sm="6" md="4" class="text-center">
                <label>Tipo de cuenta: </label>
                <label>{{ this.nombre_cuenta }}</label>
              </v-col>
              <v-spacer></v-spacer>
            </v-row>
          </template>
          </v-container>
        </v-card>
      </v-dialog>
    </template>
    <template>
      <v-dialog v-model="agregar" width="1000" persistent>
        <v-card>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-icon>mdi-account</v-icon>
            <v-spacer></v-spacer>
            <v-btn color="indigo darken-4" text @click="agregar = false"><v-icon>mdi-close</v-icon></v-btn>
          </v-card-actions>
            <v-divider></v-divider>
              <v-card-text>
                <v-container>
                  <v-form id="form" @submit.prevent="RegistroCliente">
                    <v-row>
                      <v-col cols="12" sm="6" md="6" class="text-center">
                        <v-text-field
                          v-model="nombre"
                          label="Nombre"
                          prepend-icon="mdi-account"
                          type="text"
                          color="#0a3356"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" class="text-center">
                        <v-text-field
                          v-model="apellido_paterno"
                          label="Apellido paterno"
                          type="text"
                          color="#0a3356"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="4" md="4" class="text-center">
                        <v-text-field
                          v-model="apellido_materno"
                          label="Apellido materno"
                          type="text"
                          color="#0a3356"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="4" md="4" class="text-center">
                        <v-text-field
                          v-model="rfc"
                          label="RFC"
                          type="text"
                          color="#0a3356"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="4" md="4" class="text-center">
                        <v-text-field
                          v-model="curp"
                          label="CURP"
                          type="text"
                          color="#0a3356"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="3" md="3" class="text-center">
                        <v-text-field
                          v-model="saldo_actual"
                          label="Saldo de Inicio"
                          type="text"
                          color="#0a3356"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="3" md="3" class="text-center">
                        <v-text-field
                          v-model="nombre_cuenta"
                          label="Tipo de cuenta"
                          type="text"
                          color="#0a3356"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-container>
              </v-card-text>
          <v-card-actions >
            <v-spacer></v-spacer>
            <v-btn rounded color="#0a3356" dark type="submit" @click="RegistroCliente">
              <v-icon>mdi-account-check</v-icon>
              Crear Usuario
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <template>
      <v-dialog v-model="editar" width="1000" persistent>
        <v-card>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-icon>mdi-account</v-icon>
            <v-spacer></v-spacer>
            <v-btn color="indigo darken-4" text @click="agregar = false"><v-icon>mdi-close</v-icon></v-btn>
          </v-card-actions>
            <v-divider></v-divider>
              <v-card-text>
                <v-container>
                  <v-form id="form" @submit.prevent="RegistroCliente">
                    <v-row>
                      <v-col cols="12" sm="6" md="6" class="text-center">
                        <v-text-field
                          v-model="nombre"
                          label="Nombre"
                          prepend-icon="mdi-account"
                          type="text"
                          color="#0a3356"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" class="text-center">
                        <v-text-field
                          v-model="apellido_paterno"
                          label="Apellido paterno"
                          type="text"
                          color="#0a3356"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="4" md="4" class="text-center">
                        <v-text-field
                          v-model="apellido_materno"
                          label="Apellido materno"
                          type="text"
                          color="#0a3356"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="4" md="4" class="text-center">
                        <v-text-field
                          v-model="rfc"
                          label="RFC"
                          type="text"
                          color="#0a3356"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="4" md="4" class="text-center">
                        <v-text-field
                          v-model="curp"
                          label="CURP"
                          type="text"
                          color="#0a3356"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="3" md="3" class="text-center">
                        <v-text-field
                          v-model="saldo_actual"
                          label="Saldo de Inicio"
                          type="text"
                          color="#0a3356"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="3" md="3" class="text-center">
                        <v-text-field
                          v-model="nombre_cuenta"
                          label="Tipo de cuenta"
                          type="text"
                          color="#0a3356"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-container>
              </v-card-text>
          <v-card-actions >
            <v-spacer></v-spacer>
            <v-btn rounded color="#0a3356" dark type="submit" @click="RegistroCliente">
              <v-icon>mdi-account-check</v-icon>
              Editar Usuario
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
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
        info: false,
        //cliente
        nombre: null,
        apellido_paterno: null,
        apellido_materno: null,
        rfc: null,
        curp: null,
        //cuenta
        saldo_actual: null,
        fecha_contratacion: null,
        fecha_ultimo_movimiento: null,
        //tipo de cuenta
        nombre_cuenta: null,
        error: null,
        index: null
      }
    },
    methods: {
      Info(id){
        this.info = true,
        this.nombre = this.clientes.data[id-1].attributes.nombre,
        this.apellido_paterno = this.clientes.data[id-1].attributes.apellido_paterno,
        this.apellido_materno = this.clientes.data[id-1].attributes.apellido_materno,
        this.rfc = this.clientes.data[id-1].attributes.rfc,
        this.curp = this.clientes.data[id-1].attributes.curp
        this.saldo_actual = this.cuenta.data[id-1].attributes.saldo_actual,
        this.fecha_contratacion = this.cuenta.data[id-1].attributes.createdAt,
        this.fecha_ultimo_movimiento = this.cuenta.data[id-1].attributes.updatedAt,
        this.nombre_cuenta = this.tipoCuenta.data[id-1].attributes.nombre_cuenta
        //console.log()
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
        this.nombre = this.clientes.data[id-1].attributes.nombre,
        this.apellido_paterno = this.clientes.data[id-1].attributes.apellido_paterno,
        this.apellido_materno = this.clientes.data[id-1].attributes.apellido_materno,
        this.rfc = this.clientes.data[id-1].attributes.rfc,
        this.curp = this.clientes.data[id-1].attributes.curp
        this.saldo_actual = this.cuenta.data[id-1].attributes.saldo_actual,
        this.fecha_contratacion = this.cuenta.data[id-1].attributes.createdAt,
        this.fecha_ultimo_movimiento = this.cuenta.data[id-1].attributes.updatedAt,
        this.nombre_cuenta = this.tipoCuenta.data[id-1].attributes.nombre_cuenta,
        this.index = id
        this.Editado(this.index);
      },
      async Editado(id) {
        await axios.put( 'http://localhost:1337/api/clientes/'+id).then( () => {
          console.log("Editado con exito")
          location.reload();
        })
        .catch( e => console.log(e))
      },
      Delete(id){
        console.log(id)
        axios.delete( 'http://localhost:1337/api/clientes/'+id).then( () => {
          console.log("Eliminado con exito")
          location.reload();
        })
        .catch( e => console.log(e))
      },
      async RegistroCliente() {
        await axios.post( 'http://localhost:1337/api/clientes',{
            data: {
              nombre: this.nombre,
              apellido_paterno: this.apellido_paterno,
              apellido_materno: this.apellido_materno,
              rfc: this.rfc,
              curp: this.curp
            }
        
        }).then( () => {
          console.log("funciona bien cliente")
          this.agregar = false
          this.RegistroCuenta();
        })
        .catch( e => console.log(e))

    },
    async RegistroCuenta(){
      await axios.post( 'http://localhost:1337/api/cliente-cuentas',{
        data: {
          saldo_actual: this.saldo_actual,
        }
      }).then( () => {
        console.log("funciona bien cuenta")
        this.RegistroTipoCuenta();
      })
      .catch( e => console.log(e))
    },
    async RegistroTipoCuenta(){
      await axios.post( 'http://localhost:1337/api/tipo-cuentas',{
        data: {
          nombre_cuenta: this.nombre_cuenta
        }
      }).then( () => {
        console.log("funciona bien tipo cuenta")
        this.VacioCampos();
      })
      .catch( e => console.log(e))
    },
    VacioCampos() {
      this.nombre = null
      this.apellido_paterno = null
      this.apellido_materno = null
      this.rfc = null
      this.curp = null
      this.saldo_actual = null
      this.fecha_contratacion = null
      this.fecha_ultimo_movimiento = null
      this.nombre_cuenta = null
      location.reload();
    }
    },
    created() {
      this.get_Clientes();
      this.get_Cuenta();
      this.get_TipoCuenta();
    }
  }
</script>
