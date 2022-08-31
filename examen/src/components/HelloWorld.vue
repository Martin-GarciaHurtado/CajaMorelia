<template>
  <v-container>
    <template>
      <v-simple-table dark>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                Name
              </th>
              <th class="text-left">
                Cuenta
              </th>
              <th class="text-left">
                Tipo de cuenta
              </th>
              <th>
                Informacion
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in desserts"
              :key="item.name"
            >
              <td>{{ item.name }}</td>
              <td>{{ item.calories }}</td>
              <td></td>
              <td><v-icon @click="Info()">mdi-information</v-icon></td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </template>
  </v-container>
</template>

<script>
  import axios from "axios";

  export default {
    data () {
      return {
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
          },
          {
            name: 'Eclair',
            calories: 262,
          },
          {
            name: 'Cupcake',
            calories: 305,
          },
          {
            name: 'Gingerbread',
            calories: 356,
          },
          {
            name: 'Jelly bean',
            calories: 375,
          },
          {
            name: 'Lollipop',
            calories: 392,
          },
          {
            name: 'Honeycomb',
            calories: 408,
          },
          {
            name: 'Donut',
            calories: 452,
          },
          {
            name: 'KitKat',
            calories: 518,
          },
        ],
      }
    },
    methods: {
      Info(){
        console.log("Funciona")
      },
      get_Clientes(){
        axios.get( 'http://localhost:1337/api/clientes' ).then( res => {
          console.log(res.data)
        })
        .catch( e => {
          console.log(e)
        })
      }
    },
    created() {
      this.get_Clientes();
    }
  }
</script>
