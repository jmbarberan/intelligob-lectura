<script setup>
import { useForm, useField } from 'vee-validate';
import { ref } from 'vue'
import * as Yup from 'yup';

import { useAuthStore } from '@/stores';

const validationSchema = yup.object().shape({
    username: yup.string().required('El usuario es obligatorio.'),
    password: yup.string().required('La contraseña es obligatoria.'),
});

const { handleSubmit, handleReset } = useForm({
    validationSchema,
});

const passVisible = ref(false);
const username = useField('email', validationSchema);
const password = useField('password', validationSchema);

const onSubmit = handleSubmit(async (values) => {
    const authStore = useAuthStore();
    const { username, password } = values;
    await authStore.login(username, password);
});
</script>

<template>
    <div>
        <v-img
            class="mx-auto my-6"
            max-width="228"
            src="/src/assets/meter.svg"
        ></v-img>
        <v-card
            class="mx-auto pa-12 pb-8"
            elevation="8"
            max-width="448"
            rounded="lg"
        >
            <div class="text-subtitle-1 text-medium-emphasis">Acceder</div>
            <form @submit.prevent="onSubmit">
                <v-text-field
                    v-model="username.value.value"
                    :error-messages="username.errorMessage.value"
                    :rules="[rules.required]"
                    label="Usuario"
                    name="username"
                    variant="outlined"
                    density="compact"
                >
                </v-text-field>
                <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                    Contraseña

                    <a
                        class="text-caption text-decoration-none text-blue"
                        href="#"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                    Olvido la contraseña?</a>
                </div>
                <v-text-field
                    v-model="password.value.value"
                    :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                    :rules="[rules.required]"
                    :error-messages="password.errorMessage.value"
                    :type="passVisible ? 'text' : 'password'"
                    name="password"
                    variant="outlined"
                    density="compact"
                    @click:append-inner="passVisible = !passVisible"
                />
                <v-card
                    class="mb-12"
                    color="surface-variant"
                    variant="tonal"
                >
                    <v-card-text class="text-medium-emphasis text-caption">
                    Atención: Para poder acceder este dispositivo debe estar autorizado en el sistema, si necesita ser habilitado haga click en <span class="font-weight-bold">Solicitar autorización.</span>
                    </v-card-text>
                </v-card>
                <v-btn variant="tonal" block class="mb-8" :disabled="isSubmitting">
                    <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                    Acceder
                </v-btn>
                <v-card-text class="text-center">
                    <a class="text-blue text-decoration-none"
                        href="#"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                    Solicitar autorización <v-icon icon="mdi-chevron-right"></v-icon>
                    </a>
                </v-card-text>
            </form>
        </v-card>
    </div>
</template>