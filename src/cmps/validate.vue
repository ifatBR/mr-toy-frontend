<template>
  <section>
    <ValidationProvider name="email" rules="required">
      <div slot-scope="{ errors }">
        <input v-model="email" type="number"/>
        <p>{{ errors[0] }}</p>
      </div>
    </ValidationProvider>
  </section>
</template>

<script>
import { extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';
import { ValidationProvider } from "vee-validate";
// / Add the required rule
extend('required', {
  ...required,
  message: 'This field is required'
});
 
// Add the email rule
extend('email', {
  ...email,
  message: 'This field must be a valid email'
});
export default {
    data(){
        return{
            email:''
        }
    },
    components:{
        ValidationProvider
    }
}
</script>

