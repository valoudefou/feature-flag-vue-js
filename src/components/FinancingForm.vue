<template>
  <div v-if="visible"
    class="sticky top-0 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 shadow-sm backdrop-blur-sm p-6 max-w-4xl mx-auto z-50 rounded-lg">

    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <div class="flex items-center gap-3">
        <div class="w-2 h-2 bg-emerald-500 rounded-full"></div>
        <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">AB Tasty Configuration</h3>
      </div>

      <div class="flex items-center gap-4">
        <!-- Dropdown to select variation -->
        <select v-model="selectedVariation" @change="updateConfigJson"
          class="rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-3 py-1">
          <option value="original">Original</option>
          <option value="variation1">Variation 1</option>
          <option value="variation2">Variation 2</option>
        </select>

        <button @click="resetForm"
          class="cursor-pointer inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600"
          title="Reset configuration">
          <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Reset
        </button>

        <button @click="visible = false"
          class="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600"
          title="Close editor">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Code Editor -->
    <div class="relative">
      <textarea v-model="configJson" spellcheck="false" placeholder="Enter your AB Tasty configuration JSON..." class="w-full h-36 p-4 font-mono text-sm bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-lg resize-y transition-colors
             focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent
             placeholder:text-gray-400 dark:placeholder:text-gray-500"></textarea>

      <div class="absolute top-2 right-2 text-xs text-gray-400 dark:text-gray-500 font-mono">JSON</div>
    </div>

    <!-- Error Message -->
    <div v-if="parseError"
      class="mt-4 p-3 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-lg">
      <div class="flex items-start gap-2">
        <svg class="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clip-rule="evenodd" />
        </svg>
        <div>
          <p class="text-sm font-medium text-red-800 dark:text-red-200">JSON Parse Error</p>
          <p class="text-sm text-red-600 dark:text-red-300 mt-1 font-mono">{{ parseError }}</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Show button when panel is hidden -->
  <button v-else @click="visible = true"
    class="fixed top-4 right-4 z-40 inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
    title="Open AB Tasty configuration editor">
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
    Config
  </button>

  <template>
    <div class="flex gap-6">
      <textarea v-model="configJson" class="w-1/3 h-96 p-4 border rounded" spellcheck="false"
        aria-label="Edit form config JSON"></textarea>

      <div class="w-2/3">
        <!-- Your form UI here reads from reactive formConfig -->
        <div v-for="(cfg, name) in formConfig.fields" :key="name">
          <p><b>{{ name }}</b> - showWhen: {{ cfg.showWhen }}, required: {{ cfg.required }}</p>
        </div>
      </div>
    </div>
  </template>
  <div class="min-h-screen mt-[-136px] bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
    <div class="max-w-6xl mx-auto">
      <div id="siteHeader" class="max-w-screen-xl mx-auto px-4 flex items-center justify-between py-4">
        <!-- Left: Logo + Conditional Back Button -->
        <div class="flex items-center space-x-4 blur-md">
          <a href="#" class="flex items-center space-x-2">
            <img src="https://secureapply.curryspcworldyourplan.co.uk/globalassets/currys_flexpay_175x175.png"
              height="66" class="h-32" alt="Currys Logo">
            <span></span>
          </a>
        </div>

        <!-- Right: Partner Logo -->
        <div>
          <img src="https://secureapply.curryspcworldyourplan.co.uk/globalassets/cetelem_logo_creation_solo_rvb.png"
            alt="Currys flexpay account" class="h-10 blur-md">
        </div>
      </div>

      <!-- Header Section -->
      <section class="max-w-2xl mx-auto text-center mb-10 px-5">
        <!-- Title with accent underline -->
        <h1 class="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight relative inline-block">
          Check your eligibility
          <span class="block h-1 w-16 bg-purple-800 rounded mt-2 mx-auto"></span>
        </h1>

        <!-- Description Text -->
        <div class="text-gray-600 text-base sm:text-lg leading-relaxed space-y-6 max-w-xl mx-auto">
          <p>
            It only takes a couple of minutes, and there’s no impact on your credit score.
          </p>
          <p>
            When you've completed this page, we'll tell you if you're likely to be accepted, your credit limit and your
            personalised APR, which will be set based on your individual circumstances.
          </p>
        </div>
      </section>

      <!-- Grid Section -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-10 px-6 max-w-7xl mx-auto">

        <!-- Form Card -->
        <div class="lg:col-span-2 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div class="p-8">
            <form @submit.prevent="handleSubmit" class="space-y-8">

              <!-- Personal Details Section -->
              <div class="space-y-6">
                <div class="border-b border-slate-200 pb-4">
                  <h2 class="text-2xl font-semibold text-slate-900 flex items-center gap-3">
                    <div
                      class="w-8 h-8 border border-purple-800 rounded-full flex items-center justify-center text-text-black font-bold text-sm">
                      1</div>
                    Personal Details
                  </h2>
                </div>

                <!-- Title -->
                <div class="space-y-5">
                  <div v-if="fieldVisibility.title" class="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
                    <label class="block text-sm font-semibold text-slate-700 sm:w-48 sm:pt-3 sm:text-right">
                      Title
                      <span v-if="formConfig.fields.title.required && !form.title" class="text-red-500 ml-1">*</span>
                    </label>
                    <div class="flex-1">
                      <select v-model="form.title" :placeholder="formConfig.fields.title.placeholder"
                        class="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-purple-800/20 bg-white border-slate-200 focus:border-purple-800"
                        :class="{ 'border-red-300 focus:border-red-500': errors.title }">
                        <option value="">{{ formConfig.fields.title.placeholder }}</option>
                        <option value="Mr">Mr</option>
                        <option value="Mrs">Mrs</option>
                        <option value="Miss">Miss</option>
                        <option value="Ms">Ms</option>
                        <option value="Dr">Dr</option>
                        <option value="Other">Other</option>
                      </select>
                      <p v-if="errors.title" class="text-red-600 text-sm font-medium mt-1">
                        {{ errors.title }}
                      </p>
                    </div>
                  </div>

                  <!-- First Name -->
                  <div v-if="fieldVisibility.firstName" class="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
                    <label class="block text-sm font-semibold text-slate-700 sm:w-48 sm:pt-3 sm:text-right">
                      First Name
                      <span v-if="formConfig.fields.firstName.required && !form.firstName"
                        class="text-red-500 ml-1">*</span>
                    </label>
                    <div class="flex-1">
                      <input v-model="form.firstName" type="text" :placeholder="formConfig.fields.firstName.placeholder"
                        class="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-purple-800/20 border-slate-200 focus:border-purple-800"
                        :class="{ 'border-red-300 focus:border-red-500': errors.firstName }" />
                      <p v-if="errors.firstName" class="text-red-600 text-sm font-medium mt-1">
                        {{ errors.firstName }}
                      </p>
                    </div>
                  </div>

                  <!-- Last Name -->
                  <div v-if="fieldVisibility.lastName" class="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
                    <label class="block text-sm font-semibold text-slate-700 sm:w-48 sm:pt-3 sm:text-right">
                      Last Name
                      <span v-if="formConfig.fields.lastName.required && !form.lastName"
                        class="text-red-500 ml-1">*</span>
                    </label>
                    <div class="flex-1">
                      <input v-model="form.lastName" type="text" :placeholder="formConfig.fields.lastName.placeholder"
                        class="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-purple-800/20 border-slate-200 focus:border-purple-800"
                        :class="{ 'border-red-300 focus:border-red-500': errors.lastName }" />
                      <p v-if="errors.lastName" class="text-red-600 text-sm font-medium mt-1">
                        {{ errors.lastName }}
                      </p>
                    </div>
                  </div>

                  <!-- Date of Birth -->
                  <div v-if="fieldVisibility.dateOfBirth"
                    class="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
                    <label class="block text-sm font-semibold text-slate-700 sm:w-48 sm:pt-3 sm:text-right">
                      Date of Birth
                      <span v-if="formConfig.fields.dateOfBirth.required && !form.dateOfBirth"
                        class="text-red-500 ml-1">*</span>
                    </label>
                    <div class="flex-1">
                      <input v-model="form.dateOfBirth" type="date"
                        :placeholder="formConfig.fields.dateOfBirth.placeholder"
                        class="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-purple-800/20 border-slate-200 focus:border-purple-800"
                        :class="{ 'border-red-300 focus:border-red-500': errors.dateOfBirth }" />
                      <p v-if="errors.dateOfBirth" class="text-red-600 text-sm font-medium mt-1">
                        {{ errors.dateOfBirth }}
                      </p>
                    </div>
                  </div>

                  <!-- Marital Status -->
                  <div v-if="fieldVisibility.maritalStatus"
                    class="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
                    <label class="block text-sm font-semibold text-slate-700 sm:w-48 sm:pt-3 sm:text-right">
                      Marital Status
                      <span v-if="formConfig.fields.maritalStatus.required && !form.maritalStatus"
                        class="text-red-500 ml-1">*</span>
                    </label>
                    <div class="flex-1">
                      <select v-model="form.maritalStatus"
                        class="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-purple-800/20 bg-white border-slate-200 focus:border-purple-800"
                        :class="{ 'border-red-300 focus:border-red-500': errors.maritalStatus }">
                        <option value="">{{ formConfig.fields.maritalStatus.placeholder }}</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option value="Divorced">Divorced</option>
                        <option value="Widowed">Widowed</option>
                        <option value="Other">Other</option>
                      </select>
                      <p v-if="errors.maritalStatus" class="text-red-600 text-sm font-medium mt-1">
                        {{ errors.maritalStatus }}
                      </p>
                    </div>
                  </div>

                  <!-- Number of Dependants (conditional) -->
                  <div v-if="fieldVisibility.dependants"
                    class="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
                    <label class="block text-sm font-semibold text-slate-700 sm:w-48 sm:pt-3 sm:text-right">
                      Number of Dependants
                      <span v-if="
                        formConfig.fields.dependants.required &&
                        (form.dependants === '' ||
                          form.dependants === null ||
                          form.dependants === undefined)
                      " class="text-red-500 ml-1">*</span>
                    </label>
                    <div class="flex-1">
                      <select v-model.number="form.dependants"
                        class="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-purple-800/20 bg-white border-slate-200 focus:border-purple-800"
                        :class="{ 'border-red-300 focus:border-red-500': errors.dependants }">
                        <option value="">{{ formConfig.fields.dependants.placeholder }}</option>
                        <option v-for="n in 11" :key="n - 1" :value="n - 1">{{ n - 1 }}</option>
                      </select>
                      <p v-if="errors.dependants" class="text-red-600 text-sm font-medium mt-1">
                        {{ errors.dependants }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Address Details Section -->
              <div class="space-y-6">
                <div class="border-b border-slate-200 pb-4">
                  <h2 class="text-2xl font-semibold text-slate-900 flex items-center gap-3">
                    <div
                      class="w-8 h-8 border border-purple-800 rounded-full flex items-center justify-center text-text-black font-bold text-sm">
                      2</div>
                    Address Details
                  </h2>
                </div>
                <!-- Residential Status -->
                <div class="space-y-5">
                  <div v-if="fieldVisibility.residentialStatus"
                    class="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
                    <label class="block text-sm font-semibold text-slate-700 sm:w-48 sm:pt-3 sm:text-right">
                      Residential Status
                      <span v-if="formConfig.fields.residentialStatus.required && !form.residentialStatus"
                        class="text-red-500 ml-1">*</span>
                    </label>
                    <div class="flex-1">
                      <select v-model="form.residentialStatus"
                        class="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-purple-800/20 bg-white border-slate-200 focus:border-purple-800"
                        :class="{ 'border-red-300 focus:border-red-500': errors.residentialStatus }">
                        <option value="">{{ formConfig.fields.residentialStatus.placeholder }}</option>
                        <option value="Homeowner">Homeowner</option>
                        <option value="Tenant">Tenant</option>
                        <option value="Living with Parents">Living with Parents</option>
                        <option value="Other">Other</option>
                      </select>
                      <p v-if="errors.residentialStatus" class="text-red-600 text-sm font-medium mt-1">
                        {{ errors.residentialStatus }}
                      </p>
                    </div>
                  </div>

                  <!-- House Name -->
                  <div v-if="fieldVisibility.houseName"
                    class="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6 mt-4">
                    <label class="block text-sm font-semibold text-slate-700 sm:w-48 sm:pt-3 sm:text-right">
                      House Name
                      <span v-if="formConfig.fields.houseName.required && !form.houseName"
                        class="text-red-500 ml-1">*</span>
                    </label>
                    <div class="flex-1">
                      <input v-model="form.houseName" type="text" :placeholder="formConfig.fields.houseName.placeholder"
                        class="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-purple-800/20 border-slate-200 focus:border-purple-800" />
                      <p v-if="errors.residentialStatus" class="text-red-600 text-sm font-medium mt-1">
                        {{ errors.residentialStatus }}
                      </p>
                    </div>
                  </div>

                  <!-- House Number -->
                  <div v-if="fieldVisibility.houseNumber"
                    class="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
                    <label class="block text-sm font-semibold text-slate-700 sm:w-48 sm:pt-3 sm:text-right">
                      House Number
                      <span v-if="formConfig.fields.houseNumber.required && !form.houseNumber"
                        class="text-red-500 ml-1">*</span>
                    </label>
                    <div class="flex-1">
                      <input v-model="form.houseNumber" type="text"
                        :placeholder="formConfig.fields.houseNumber.placeholder"
                        class="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-purple-800/20 border-slate-200 focus:border-purple-800"
                        :class="{ 'border-red-300 focus:border-red-500': errors.houseNumber }" />
                      <p v-if="errors.houseNumber" class="text-red-600 text-sm font-medium mt-1">
                        {{ errors.houseNumber }}
                      </p>
                    </div>
                  </div>

                  <!-- Postcode -->
                  <div v-if="fieldVisibility.postcode" class="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
                    <label class="block text-sm font-semibold text-slate-700 sm:w-48 sm:pt-3 sm:text-right">
                      Postcode
                      <span v-if="formConfig.fields.postcode.required && !form.postcode"
                        class="text-red-500 ml-1">*</span>
                    </label>
                    <div class="flex-1">
                      <input v-model="form.postcode" type="text" :placeholder="formConfig.fields.postcode.placeholder"
                        class="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-purple-800/20 border-slate-200 focus:border-purple-800"
                        :class="{ 'border-red-300 focus:border-red-500': errors.postcode }" />
                      <p v-if="errors.postcode" class="text-red-600 text-sm font-medium mt-1">
                        {{ errors.postcode }}
                      </p>
                    </div>
                  </div>

                  <!-- Time at Address -->
                  <div v-if="fieldVisibility.timeAtAddress"
                    class="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
                    <label class="block text-sm font-semibold text-slate-700 sm:w-48 sm:pt-3 sm:text-right">
                      Time at Address
                      <span v-if="formConfig.fields.timeAtAddress.required && !form.timeAtAddress"
                        class="text-red-500 ml-1">*</span>
                    </label>
                    <div class="flex-1">
                      <select v-model="form.timeAtAddress"
                        class="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-purple-800/20 bg-white border-slate-200 focus:border-purple-800"
                        :class="{ 'border-red-300 focus:border-red-500': errors.timeAtAddress }">
                        <option value="">{{ formConfig.fields.timeAtAddress.placeholder }}</option>
                        <option value="Less than 6 months">Less than 6 months</option>
                        <option value="6–12 months">6–12 months</option>
                        <option value="1–2 years">1–2 years</option>
                        <option value="2–3 years">2–3 years</option>
                        <option value="3–5 years">3–5 years</option>
                        <option value="More than 5 years">More than 5 years</option>
                      </select>
                      <p v-if="errors.timeAtAddress" class="text-red-600 text-sm font-medium mt-1">
                        {{ errors.timeAtAddress }}
                      </p>
                    </div>
                  </div>

                  <!-- Monthly Contribution to Rent -->
                  <div v-if="fieldVisibility.monthlyHousingCost"
                    class="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
                    <label class="block text-sm font-semibold text-slate-700 sm:w-48 sm:pt-3 sm:text-right">
                      Monthly Contribution to Mortgage or Rent
                      <span v-if="formConfig.fields.monthlyHousingCost.required && !form.monthlyHousingCost"
                        class="text-red-500 ml-1">*</span>
                    </label>
                    <div class="flex-1">
                      <div class="relative">
                        <span
                          class="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 font-medium">£</span>
                        <input v-model.number="form.monthlyHousingCost" type="number"
                          :placeholder="formConfig.fields.monthlyHousingCost.placeholder"
                          class="w-full pl-8 pr-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-purple-800/20 border-slate-200 focus:border-purple-800"
                          :class="{ 'border-red-300 focus:border-red-500': errors.monthlyHousingCost }" />
                      </div>
                      <p v-if="errors.monthlyHousingCost" class="text-red-600 text-sm font-medium mt-1">
                        {{ errors.monthlyHousingCost }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Employment Details Section -->
              <div class="space-y-6">
                <div class="border-b border-slate-200 pb-4">
                  <h2 class="text-2xl font-semibold text-slate-900 flex items-center gap-3">
                    <div
                      class="w-8 h-8 border border-purple-800 rounded-full flex items-center justify-center text-text-black font-bold text-sm">
                      3</div>
                    Employment Details
                  </h2>
                </div>
                <div class="space-y-5">

                  <!-- Employment Income -->
                  <div v-if="fieldVisibility.employmentStatus"
                    class="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
                    <label class="block text-sm font-semibold text-slate-700 sm:w-48 sm:pt-3 sm:text-right">
                      Employment Status
                      <span v-if="formConfig.fields.employmentStatus.required && !form.employmentStatus"
                        class="text-red-500 ml-1">*</span>
                    </label>
                    <div class="flex-1">
                      <select v-model="form.employmentStatus"
                        :placeholder="formConfig.fields.employmentStatus.placeholder || 'Select employment status'"
                        class="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-purple-800/20 bg-white border-slate-200 focus:border-purple-800"
                        :class="{ 'border-red-300 focus:border-red-500': errors.employmentStatus }">
                        <option value="" disabled>Select employment status</option>
                        <option value="Employed">Employed</option>
                        <option value="Self-Employed">Self-Employed</option>
                        <option value="Unemployed">Unemployed</option>
                        <option value="Retired">Retired</option>
                        <option value="Student">Student</option>
                        <option value="Other">Other</option>
                      </select>
                      <p v-if="errors.employmentStatus" class="text-red-600 text-sm font-medium mt-1">
                        {{ errors.employmentStatus }}
                      </p>
                    </div>
                  </div>

                  <!-- Personal Monthly Net Income -->
                  <div v-if="fieldVisibility.monthlyNetIncome" class="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
                    <label class="block text-sm font-semibold text-slate-700 sm:w-48 sm:pt-3 sm:text-right">
                      Personal Monthly Net Income
                      <span v-if="formConfig.fields.monthlyNetIncome.required && !form.monthlyNetIncome"
                        class="text-red-500 ml-1">*</span>
                    </label>
                    <div class="flex-1">
                      <div class="relative">
                        <span
                          class="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 font-medium">£</span>
                        <input v-model.number="form.monthlyNetIncome" type="number"
                          placeholder="Enter monthly net income"
                          class="w-full pl-8 pr-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-purple-800/20 border-slate-200 focus:border-purple-800"
                          :class="{ 'border-red-300 focus:border-red-500': errors.monthlyNetIncome }" min="0" />
                      </div>
                      <p v-if="errors.monthlyNetIncome" class="text-red-600 text-sm font-medium mt-1">
                        {{ errors.monthlyNetIncome }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Confirmation Section -->
              <div class="space-y-6">
                <div class="border-b border-slate-200 pb-4">
                  <h2 class="text-2xl font-semibold text-slate-900 flex items-center gap-3">
                    <div
                      class="w-8 h-8 border border-purple-800 rounded-full flex items-center justify-center text-text-black font-bold text-sm">
                      4</div>
                    Confirmation
                  </h2>
                </div>

                <div class="bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <label class="flex items-start gap-4 cursor-pointer">
                    <div class="flex-1">
                      <p class="text-sm text-slate-700 leading-relaxed">
                        <span class="font-semibold">I confirm</span> that the information I have provided is accurate
                        and up to date, and that I can afford the credit repayments over the term of the agreement. This
                        should take into account any known or expected change in financial circumstances, such as
                        working fewer hours, going on maternity leave or any increase in your mortgage or rent
                        repayments.
                      </p>
                      <!-- Material Design Toggle -->

                      <div class="relative mt-6 mb-6 px-2">
                        <input v-model="form.confirmationChecked" type="checkbox" class="sr-only" />

                        <!-- Track -->
                        <div
                          class="w-18 h-8 rounded-full transition-all duration-200 flex items-center justify-center text-xs font-semibold text-white"
                          :class="[
                            form.confirmationChecked
                              ? 'bg-emerald-600 pr-4'
                              : errors.confirmationChecked
                                ? 'bg-red-200 text-red-800 pl-4'
                                : 'bg-slate-300 text-slate-700 pl-4'
                          ]">
                          {{ form.confirmationChecked ? 'YES' : 'NO' }}
                        </div>

                        <!-- Thumb -->
                        <div
                          class="absolute top-0 left-0 w-8 h-8 rounded-full shadow-md transition-all duration-200 transform"
                          :class="[
                            form.confirmationChecked ? 'translate-x-14 bg-white' : 'translate-x-0 bg-white',
                            errors.confirmationChecked && !form.confirmationChecked ? 'bg-red-500' : ''
                          ]">
                          <!-- Ripple Effect (optional) -->
                          <div class="absolute inset-0 rounded-full transition-all duration-200"
                            :class="form.confirmationChecked ? 'bg-blue-600' : 'bg-slate-400'"
                            style="transform: scale(0);"></div>
                        </div>
                      </div>
                      <p data-v-6bbcd804=""
                        class="pt-6 border-t border-slate-200 text-sm text-slate-700 leading-relaxed mt-4">
                        By completing and submitting your details, you agree to Creation sharing these with Credit
                        Reference Agencies and **** Group Limited. Creation will use this information to carry out
                        this eligibility check. We may use your data to contact you for feedback on how we could improve
                        our application journey, but we will not share or use your data for any other reason and will
                        keep it confidential. This check won’t affect whether you can get credit in the future, or be
                        seen by any other lender. If you are eligible, you can continue your application.
                      </p>
                    </div>
                  </label>
                  <p v-if="errors.confirmationChecked" class="text-red-600 text-sm font-medium mt-2">{{
                    errors.confirmationChecked }}</p>
                </div>
              </div>

              <!-- Submit Button -->
              <button type="submit" :disabled="isSubmitting || !canSubmit" :class="[
                'mt-10 w-full px-8 py-4 text-white rounded-xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg',
                formProgress < 100
                  ? 'bg-emerald-600 hover:to-emerald-300 hover:shadow-lg'
                  : 'bg-emerald-600 hover:bg-emerald-700 hover:shadow-xl'
              ]">
                <div v-if="isSubmitting" class="flex items-center justify-center gap-3">
                  <div class="animate-spin rounded-full border-2 border-white border-t-transparent w-5 h-5"></div>
                  Processing...
                </div>
                <div v-else class="flex items-center justify-center gap-2">
                  <span v-if="formProgress < 100">Form Completion:</span>
                  <span>{{ formProgress < 100 ? formProgress + '%' : 'Perform Check' }}</span>
                </div>
              </button>
            </form>
          </div>
        </div>

        <!-- Summary Section -->
        <div class="lg:col-span-1">
          <div class="sticky top-6">
            <div class="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">

              <!-- Future Purchases -->
              <div class="p-6 border-b border-slate-100 bg-slate-50">
                <h4 class="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z">
                    </path>
                  </svg>
                  Future purchases
                </h4>
                <p class="text-sm text-slate-600 leading-relaxed">
                  **** ***pay offers a credit account with a reusable credit limit for online or in-store purchases
                  £99 and over.
                </p>
              </div>

              <!-- Representative Example -->
              <div class="p-6">
                <h4 class="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Representative example
                </h4>
                <div class="overflow-x-auto rounded-lg border border-emerald-200 bg-emerald-50">
                  <table class="min-w-full table-auto">
                    <tbody class="divide-y divide-emerald-100">
                      <tr class="hover:bg-emerald-100 transition-colors">
                        <td class="px-4 py-3 text-sm font-medium text-emerald-700">Representative:</td>
                        <td class="px-4 py-3 text-sm font-bold text-emerald-800 text-right sm:text-left">29.9% APR
                          (variable)
                        </td>
                      </tr>
                      <tr class="hover:bg-emerald-100 transition-colors">
                        <td class="px-4 py-3 text-sm font-medium text-emerald-700">Interest rate variable:</td>
                        <td class="px-4 py-3 text-sm font-bold text-emerald-800 text-right sm:text-left">29.9%</td>
                      </tr>
                      <tr class="hover:bg-emerald-100 transition-colors">
                        <td class="px-4 py-3 text-sm font-medium text-emerald-700">Assumed credit limit:</td>
                        <td class="px-4 py-3 text-sm font-bold text-emerald-800 text-right sm:text-left">£1200</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Help Text -->
      <div class="text-center mt-6">
        <p class="text-sm text-slate-500">
          Need help? Contact our support team at
          <a href="mailto:support@example.com" class="text-blue-600 hover:text-blue-700 font-medium">
            support@example.com
          </a>
        </p>
      </div>
    </div>
  </div>
  <footer class="bg-white py-8">

    <!-- Top Footer Nav Links -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <ul class="flex flex-wrap justify-center space-x-6 text-sm text-gray-600">
        <li>
          <a href="" title="Contact" target="_blank" class="hover:underline">Help &amp; contact</a>
        </li>
        <li>
          <a href="" title="Cookie Policy &amp; Preferences" target="_blank" class="hover:underline">Cookie Policy &amp;
            Preferences</a>
        </li>
        <li>
          <a href="" title="Terms &amp; conditions" target="_blank" class="hover:underline">Terms &amp; conditions</a>
        </li>
        <li>
          <a href="" title="About responsible lending" target="_blank" class="hover:underline">About responsible
            lending</a>
        </li>
        <li>
          <a href="" title="Data protection notice" target="_blank" class="hover:underline">Data protection notice</a>
        </li>
      </ul>
    </div>

    <!-- Bottom Footer Logo Section -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center space-y-4">
      <div>
        <img src="https://secureapply.curryspcworldyourplan.co.uk/globalassets/stacked_2.jpg" alt="Logo Currys"
          class="h-14 object-contain blur-md" />
      </div>
    </div>
  </footer>
</template>

<script setup>
import { reactive, ref, computed, watch, defineEmits } from 'vue'

// Reactive state
const visible = ref(true)
const selectedVariation = ref('original')
const configJson = ref('')
const parseError = ref(null)
const isSubmitting = ref(false)
const errors = ref({})

const visitor = reactive({
  original: {
    formConfig: {
      fields: {
        title: {
          showWhen: false,
          required: true,
          placeholder: 'Select your title',
          label: 'Title',
          visible: true,
          autoPopulate: ''
        },
        firstName: {
          showWhen: false,
          required: true,
          placeholder: 'Enter your first name',
          label: 'First Name',
          visible: true,
          autoPopulate: ''
        },
        lastName: {
          showWhen: false,
          required: true,
          placeholder: 'Enter your last name',
          label: 'Last Name',
          visible: true,
          autoPopulate: ''
        },
        dateOfBirth: {
          showWhen: false,
          required: true,
          placeholder: 'DD/MM/YYYY',
          label: 'Date of Birth',
          visible: true,
          autoPopulate: ''
        },
        maritalStatus: {
          showWhen: false,
          required: true,
          placeholder: 'Select your marital status',
          label: 'Marital Status',
          visible: true,
          autoPopulate: ''
        },
        dependants: {
          showWhen: false,
          required: true,
          placeholder: 'Number of dependants',
          label: 'Number of Dependants',
          visible: true,
          autoPopulate: ''
        },
        residentialStatus: {
          showWhen: false,
          required: true,
          placeholder: 'Select your residential status',
          label: 'Residential Status',
          visible: true,
          autoPopulate: ''
        },
        houseName: {
          showWhen: false,
          required: false,
          placeholder: 'House name (optional)',
          label: 'House Name',
          visible: true,
          autoPopulate: ''
        },
        houseNumber: {
          showWhen: false,
          required: true,
          placeholder: 'House number',
          label: 'House Number',
          visible: true,
          autoPopulate: ''
        },
        postcode: {
          showWhen: false,
          required: true,
          placeholder: 'Enter your postcode',
          label: 'Postcode',
          visible: true,
          autoPopulate: ''
        },
        timeAtAddress: {
          showWhen: false,
          required: true,
          placeholder: 'Years at current address',
          label: 'Time at Address',
          visible: true,
          autoPopulate: ''
        },
        monthlyHousingCost: {
          showWhen: false,
          required: true,
          placeholder: 'Monthly housing cost (£)',
          label: 'Monthly Housing Cost (£)',
          visible: true,
          autoPopulate: ''
        },
        employmentStatus: {
          showWhen: false,
          required: true,
          placeholder: 'Select employment status',
          label: 'Employment Status',
          visible: true,
          autoPopulate: ''
        },
        monthlyNetIncome: {
          showWhen: false,
          required: true,
          placeholder: 'Monthly net income (£)',
          label: 'Monthly Net Income (£)',
          visible: true,
          autoPopulate: ''
        },
      }
    }
  },
  variation1: {
    formConfig: {
      fields: {
        title: {
          showWhen: false,
          required: true,
          placeholder: 'Choose your title',
          label: 'Title',
          visible: true,
          autoPopulate: ''
        },
        firstName: {
          showWhen: false,
          required: true,
          placeholder: 'Enter first name',
          label: 'First Name',
          visible: true,
          autoPopulate: ''
        },
        lastName: {
          showWhen: false,
          required: true,
          placeholder: 'Enter last name',
          label: 'Last Name',
          visible: true,
          autoPopulate: ''
        },
        dateOfBirth: {
          showWhen: false,
          required: true,
          placeholder: 'Date of Birth (DD/MM/YYYY)',
          label: 'Date of Birth',
          visible: true,
          autoPopulate: ''
        },
        maritalStatus: {
          showWhen: false,
          required: true,
          placeholder: 'Choose marital status',
          label: 'Marital Status',
          visible: true,
          autoPopulate: ''
        },
        dependants: {
          showWhen: false,
          required: true,
          placeholder: 'Dependants count',
          label: 'Number of Dependants',
          visible: true,
          autoPopulate: ''
        },
        residentialStatus: {
          showWhen: 'dependants',
          required: true,
          placeholder: 'Choose residential status',
          label: 'Residential Status',
          visible: true,
          autoPopulate: ''
        },
        houseName: {
          showWhen: 'dependants',
          required: false,
          placeholder: 'Enter house name',
          label: 'House Name',
          visible: true,
          autoPopulate: ''
        },
        houseNumber: {
          showWhen: 'dependants',
          required: true,
          placeholder: 'Enter house number',
          label: 'House Number',
          visible: true,
          autoPopulate: ''
        },
        postcode: {
          showWhen: 'dependants',
          required: true,
          placeholder: 'Postcode',
          label: 'Postcode',
          visible: true,
          autoPopulate: ''
        },
        timeAtAddress: {
          showWhen: 'dependants',
          required: true,
          placeholder: 'Years at address',
          label: 'Time at Address',
          visible: true,
          autoPopulate: ''
        },
        monthlyHousingCost: {
          showWhen: 'dependants',
          required: true,
          placeholder: 'Housing cost per month (£)',
          label: 'Monthly Housing Cost (£)',
          visible: true,
          autoPopulate: ''
        },
        employmentStatus: {
          showWhen: 'monthlyHousingCost',
          required: true,
          placeholder: 'Employment status',
          label: 'Employment Status',
          visible: true,
          autoPopulate: ''
        },
        monthlyNetIncome: {
          showWhen: 'monthlyHousingCost',
          required: true,
          placeholder: 'Net income monthly (£)',
          label: 'Monthly Net Income (£)',
          visible: true,
          autoPopulate: ''
        },
      }
    }
  },
  variation2: {
    formConfig: {
      fields: {
        title: {
          showWhen: false,
          required: true,
          placeholder: 'Title (Mr, Mrs, etc.)',
          label: 'Title',
          visible: true,
          autoPopulate: ''
        },
        firstName: {
          showWhen: 'title',
          required: true,
          placeholder: 'First Name',
          label: 'First Name',
          visible: true,
          autoPopulate: ''
        },
        lastName: {
          showWhen: 'firstName',
          required: true,
          placeholder: 'Last Name',
          label: 'Last Name',
          visible: true,
          autoPopulate: ''
        },
        dateOfBirth: {
          showWhen: 'lastName',
          required: true,
          placeholder: 'DOB (DD/MM/YYYY)',
          label: 'Date of Birth',
          visible: true,
          autoPopulate: ''
        },
        maritalStatus: {
          showWhen: 'dateOfBirth',
          required: true,
          placeholder: 'Marital status',
          label: 'Marital Status',
          visible: true,
          autoPopulate: ''
        },
          dependants: {
          showWhen: 'maritalStatus',
          required: true,
          placeholder: 'Number of dependants',
          label: 'Number of Dependants',
          visible: true,
          autoPopulate: ''
        },
        residentialStatus: {
          showWhen: 'maritalStatus',
          required: true,
          placeholder: 'Residential status',
          label: 'Residential Status',
          visible: true,
          autoPopulate: ''
        },
        houseNumber: {
          showWhen: 'residentialStatus',
          required: true,
          placeholder: 'House number',
          label: 'House Number',
          visible: true,
          autoPopulate: ''
        },
        houseName: {
          showWhen: 'houseNumber',
          required: false,
          placeholder: 'House name (optional)',
          label: 'House Name',
          visible: true,
          autoPopulate: ''
        },
        postcode: {
          showWhen: 'houseName',
          required: true,
          placeholder: 'Postcode',
          label: 'Postcode',
          visible: true,
          autoPopulate: 'GU2 9UA'
        },
        timeAtAddress: {
          showWhen: 'dependants',
          required: true,
          placeholder: 'Years at current address',
          label: 'Time at Address',
          visible: true,
          autoPopulate: ''
        },
        monthlyHousingCost: {
          showWhen: 'timeAtAddress',
          required: true,
          placeholder: 'Monthly housing cost (£)',
          label: 'Monthly Housing Cost (£)',
          visible: true,
          autoPopulate: ''
        },
        employmentStatus: {
          showWhen: 'monthlyHousingCost',
          required: true,
          placeholder: 'Employment status',
          label: 'Employment Status',
          visible: true,
          autoPopulate: ''
        },
        monthlyNetIncome: {
          showWhen: 'employmentStatus',
          required: true,
          placeholder: 'Monthly net income (£)',
          label: 'Monthly Net Income (£)',
          visible: true,
          autoPopulate: ''
        },
      }
    }
  }
})

// Form data
function createFormFromConfig(config) {
  return reactive(
    Object.fromEntries(
      Object.entries(config.fields).map(
        ([key, field]) => [key, field.autoPopulate || '']
      )
    )
  )
}

let form = createFormFromConfig(visitor[selectedVariation.value].formConfig)

// Initialize with original configuration
const initialConfig = visitor.original.formConfig
const formConfig = reactive(JSON.parse(JSON.stringify(initialConfig)))

// Emit events
const emit = defineEmits(['update:config'])

// Functions
function updateConfigJson() {
  try {
    parseError.value = null
    const config = visitor[selectedVariation.value]?.formConfig || {}
    configJson.value = JSON.stringify(config, null, 2)
  } catch (err) {
    parseError.value = err.message
  }
}

function resetForm() {
  selectedVariation.value = 'original'
  updateConfigJson()
}

function isFieldVisible(fieldName) {
  const field = formConfig.fields[fieldName]

  if (field.visible === false) return false
  if (!field.showWhen) return true
  if (typeof field.showWhen === 'boolean') return field.showWhen
  if (typeof field.showWhen === 'string') {
    const dependentValue = form[field.showWhen]
    return !!dependentValue
  }
  return true
}

function normalizeValue(val) {
  if (val === null || val === undefined) return ''
  if (typeof val === 'string') return val.trim()
  return val.toString()
}

function getRequiredFieldsComplete(fields) {
  const requiredFields = fields.filter(field => formConfig.fields?.[field]?.required)
  return requiredFields.every(field => {
    const value = normalizeValue(form[field])
    return value !== ''
  })
}

function validateForm() {
  let valid = true
  errors.value = {}

  requiredFields.value.forEach(field => {
    const val = form[field]
    if (val === '' || val === null || val === undefined) {
      errors.value[field] = 'This field is required'
      valid = false
    }
  })

  if (!form.confirmationChecked) {
    errors.value.confirmationChecked = 'You must tick YES'
    valid = false
  }

  return valid
}

async function handleSubmit() {
  if (!validateForm()) {
    console.warn('Validation failed:', errors.value)
    return
  }

  isSubmitting.value = true
  await new Promise(resolve => setTimeout(resolve, 50))

  try {
    alert('Sending data:\n' + JSON.stringify(form, null, 2))
    await new Promise(r => setTimeout(r, 1000))
  } finally {
    isSubmitting.value = false
  }
}

// Computed properties
const fieldVisibility = computed(() => {
  const visibility = {}
  for (const fieldName in formConfig.fields) {
    visibility[fieldName] = isFieldVisible(fieldName)
  }
  return visibility
})

const personalDetailsComplete = computed(() =>
  getRequiredFieldsComplete(['title', 'firstName', 'lastName', 'dateOfBirth', 'maritalStatus', 'dependants'])
)

const addressDetailsComplete = computed(() =>
  getRequiredFieldsComplete(['residentialStatus', 'houseName', 'houseNumber', 'postcode', 'timeAtAddress', 'monthlyHousingCost'])
)

const employmentDetailsComplete = computed(() =>
  getRequiredFieldsComplete(['employmentStatus', 'monthlyNetIncome'])
)

const requiredFields = computed(() =>
  Object.entries(formConfig.fields)
    .filter(([, cfg]) => cfg.required)
    .map(([name]) => name)
)

const canSubmit = computed(() => {
  const allFilled = requiredFields.value.every(field => {
    const value = form[field]
    return value !== '' && value !== null && value !== undefined
  })
  return allFilled && form.confirmationChecked
})

const formProgress = computed(() => {
  const filledCount = requiredFields.value.filter(field => {
    const val = form[field]
    return val !== '' && val !== null && val !== undefined
  }).length
  return Math.floor((filledCount / requiredFields.value.length) * 100)
})

// Watchers
watch(selectedVariation, (newVal) => {
  form = createFormFromConfig(visitor[newVal].formConfig)
  // You may want to update formConfig similarly if needed
})

watch(configJson, (newVal) => {
  try {
    const parsed = JSON.parse(newVal)
    parseError.value = null
    emit('update:config', parsed)

    // Update formConfig
    for (const key in formConfig.fields) delete formConfig.fields[key]
    for (const key in parsed.fields) formConfig.fields[key] = parsed.fields[key]
  } catch (e) {
    parseError.value = e.message
  }
})

watch(selectedVariation, () => {
  updateConfigJson()
})

// Initialize
updateConfigJson()

const abTastyScript = document.createElement('script')
abTastyScript.src = 'https://try.abtasty.com/1ceff369b6cd9aceaa9ee318e6498167.js'
abTastyScript.type = 'text/javascript'
abTastyScript.async = true
document.head.appendChild(abTastyScript)
</script>
