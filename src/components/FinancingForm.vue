<template>
<div v-if="visible" class="sticky top-0 bg-black shadow-md p-6 max-w-8xl mx-auto z-50 text-green-500">
  <div class="flex justify-between items-center mb-4">
    <h3 class="text-md font-semibold text-green-500">Edit AB Tasty Config</h3>
    <div class="space-x-2">
      <button
        @click="resetForm"
        class="px-3 py-1 text-sm text-red-500 cursor-pointer"
      >
        Reset
      </button>
      <button
        @click="visible = false"
        class="px-3 py-1 text-sm rounded-md bg-black shadow-md font-bold text-green-500 cursor-pointer"
      >
        Hide
      </button>
    </div>
  </div>

  <textarea
    v-model="configJson"
    class="w-full h-60 p-3 border border-green-500 rounded-md font-mono text-sm bg-black text-green-500 resize-y focus:outline-none focus:ring-2 focus:ring-green-600"
  ></textarea>

  <div v-if="parseError" class="mt-3 text-red-600 font-medium text-sm">
    JSON parse error: {{ parseError }}
  </div>
</div>



  <!-- Show button when panel is hidden -->
  <button v-else class="show-btn" @click="visible = true">Show Config Panel</button>

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
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
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
                <div v-if="fieldVisibility.title" class="space-y-5">
                  <div class="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
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
              <div v-if="personalDetailsComplete" class="space-y-6">
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
              <div v-if="personalDetailsComplete && addressDetailsComplete" class="space-y-6">
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
                  <div class="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
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
              <div v-if="personalDetailsComplete && addressDetailsComplete && employmentDetailsComplete"
                class="space-y-6">
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
import { reactive, ref, computed, watch, onMounted } from 'vue'

const visible = ref(true)

function resetForm() {
  configJson.value = JSON.stringify(initialConfig, null, 2)
  parseError.value = null
}




const position = reactive({ x: 20, y: window.innerHeight - 20 - 400 }) // start bottom-left with 400px approx height

const draggable = ref(null)

let dragOffset = { x: 0, y: 0 }
let dragging = false

function startDrag(e) {
  dragging = true
  const rect = draggable.value.getBoundingClientRect()
  const clientX = e.touches ? e.touches[0].clientX : e.clientX
  const clientY = e.touches ? e.touches[0].clientY : e.clientY
  dragOffset.x = clientX - rect.left
  dragOffset.y = clientY - rect.top
  window.addEventListener('mousemove', onDrag)
  window.addEventListener('mouseup', stopDrag)
  window.addEventListener('touchmove', onDrag)
  window.addEventListener('touchend', stopDrag)
}

function onDrag(e) {
  if (!dragging) return
  const clientX = e.touches ? e.touches[0].clientX : e.clientX
  const clientY = e.touches ? e.touches[0].clientY : e.clientY

  position.x = Math.max(0, Math.min(clientX - dragOffset.x, window.innerWidth - draggable.value.offsetWidth))
  position.y = Math.max(0, Math.min(clientY - dragOffset.y, window.innerHeight - draggable.value.offsetHeight))
}

function stopDrag() {
  dragging = false
  window.removeEventListener('mousemove', onDrag)
  window.removeEventListener('mouseup', stopDrag)
  window.removeEventListener('touchmove', onDrag)
  window.removeEventListener('touchend', stopDrag)
}

// Optional: Update position on resize to stay visible
onMounted(() => {
  window.addEventListener('resize', () => {
    position.x = Math.min(position.x, window.innerWidth - draggable.value.offsetWidth)
    position.y = Math.min(position.y, window.innerHeight - draggable.value.offsetHeight)
  })
})

const isSubmitting = ref(false)
const errors = ref({})

const form = reactive({
  // Personal Details
  title: '',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  maritalStatus: '',
  dependants: '',

  // Address Details
  residentialStatus: '',
  houseName: '',
  houseNumber: '',
  postcode: '',
  timeAtAddress: '',
  monthlyHousingCost: null,

  // Employment Details
  employmentStatus: '',
  monthlyNetIncome: null,

  // Confirmation
  confirmationChecked: false
})

// Original visitor mock config for initial load
const visitor = {
  getFlag: (flagName) => ({
    getValue: (defaultValue) => {
      const mockFlags = {
        formConfig: {
          fields: {
            title: { showWhen: false, required: true, placeholder: 'Select your title' },
            firstName: { showWhen: 'title', required: true, placeholder: 'Enter your first name' },
            lastName: { showWhen: 'firstName', required: true, placeholder: 'Enter your last name' },
            dateOfBirth: { showWhen: 'lastName', required: true, placeholder: 'DD/MM/YYYY' },
            maritalStatus: { showWhen: 'dateOfBirth', required: true, placeholder: 'Select your marital status' },
            dependants: { showWhen: 'maritalStatus', required: true, placeholder: 'Number of dependants' },
            residentialStatus: { showWhen: 'dependants', required: true, placeholder: 'Select your residential status' },
            houseName: { showWhen: 'residentialStatus', required: false, placeholder: 'House name (optional)' },
            houseNumber: { showWhen: 'residentialStatus', required: true, placeholder: 'House number' },
            postcode: { showWhen: 'houseNumber', required: true, placeholder: 'Enter your postcode' },
            timeAtAddress: { showWhen: 'postcode', required: true, placeholder: 'Years at current address' },
            monthlyHousingCost: { showWhen: 'timeAtAddress', required: true, placeholder: 'Monthly housing cost (£)' },
            employmentStatus: { showWhen: 'monthlyHousingCost', required: true, placeholder: 'Select employment status' },
            monthlyNetIncome: { showWhen: 'employmentStatus', required: true, placeholder: 'Monthly net income (£)' },
          }
        }
      }
      return mockFlags[flagName] || defaultValue
    }
  })
}


const initialConfig = visitor.getFlag("formConfig").getValue({ fields: {} })
const configJson = ref(JSON.stringify(initialConfig, null, 2))
const parseError = ref(null)

// To emit events:
const emit = defineEmits(['update:config'])

watch(configJson, (newVal) => {
  try {
    const parsed = JSON.parse(newVal)
    parseError.value = null
    emit('update:config', parsed)
  } catch (e) {
    parseError.value = e.message
  }
})

// Make formConfig reactive and editable live

const formConfig = reactive(JSON.parse(JSON.stringify(initialConfig)))

// Sync JSON textarea content with formConfig


// When JSON changes, update formConfig reactively
watch(configJson, val => {
  try {
    const parsed = JSON.parse(val)
    // Update formConfig.fields reactively
    for (const key in formConfig.fields) delete formConfig.fields[key]
    for (const key in parsed.fields) formConfig.fields[key] = parsed.fields[key]
  } catch {
    // invalid JSON, do nothing or add error handling if needed
  }
})

// Visibility function based on reactive formConfig
const isFieldVisible = (fieldName) => {
  const fieldConfig = formConfig.fields[fieldName]
  if (!fieldConfig) return true
  const condition = fieldConfig.showWhen
  if (condition === false || condition === undefined) return true
  const dependencyValue = form[condition]
  return dependencyValue !== undefined && dependencyValue !== null && dependencyValue.toString().trim() !== ''
}

const fieldVisibility = computed(() => {
  const visibility = {}
  for (const fieldName in formConfig.fields) {
    visibility[fieldName] = isFieldVisible(fieldName)
  }
  return visibility
})

const isSectionComplete = (fields) => {
  return fields.every(({ field, value }) => {
    if (!fieldVisibility.value[field]) return true // skip hidden
    return value !== '' && value !== null && value !== undefined
  })
}

function normalizeValue(val) {
  if (val === null || val === undefined) return ''
  if (typeof val === 'string') return val.trim()
  return val.toString()
}

function getRequiredFieldsComplete(fields) {
  const requiredFields = fields.filter(field => formConfig.fields?.[field]?.required)
  return isSectionComplete(
    requiredFields.map(field => ({ field, value: normalizeValue(form[field]) }))
  )
}

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


function validateForm() {
  let valid = true
  errors.value = {} // clear previous errors
  requiredFields.value.forEach(field => {
    const val = form[field]
    if (val === '' || val === null || val === undefined) {
      errors.value[field] = 'This field is required'  // mark error for empty required field
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
</script>




<style scoped>
/* Custom checkbox styling */
input[type="checkbox"]:checked {
  background-color: #2563eb;
  border-color: #2563eb;
}

/* Smooth transitions */
.transition-all {
  transition: all 0.2s ease-in-out;
}

/* Focus ring for accessibility */
input:focus,
select:focus {
  outline: none;
}

/* Error state styling */
.border-red-300:focus {
  box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1);
}

input[type="checkbox"]:checked {
  background-color: #2563eb;
  border-color: #2563eb;
}

.transition-all {
  transition: all 0.2s ease-in-out;
}

input:focus,
select:focus {
  outline: none;
}

.border-red-300:focus {
  box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1);
}

.config-panel {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 350px;
  background: rgba(255 255 255 / 0.15);
  backdrop-filter: saturate(180%) blur(12px);
  -webkit-backdrop-filter: saturate(180%) blur(12px);
  border-right: 1px solid rgba(255 255 255 / 0.3);
  box-shadow: 4px 0 16px rgba(0, 0, 0, 0.15);
  padding: 16px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #222;
  display: flex;
  flex-direction: column;
  z-index: 1000;
}

/* Mobile: panel at the top */
@media (max-width: 768px) {
  .config-panel {
    width: 100%;
    height: auto;
    max-height: 60vh;
    border-right: none;
    border-bottom: 1px solid rgba(255 255 255 / 0.3);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.panel-header>div {
  display: flex;
  gap: 8px;
}

.reset-btn,
.toggle-btn,
.show-btn {
  background: rgb(52, 12, 12);
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  color: #00c951;
  transition: background-color 0.2s ease;
}

.reset-btn:hover,
.toggle-btn:hover,

.json-textarea {
  margin-top: 8px;
  font-family: monospace;
  font-size: 14px;
  background: rgba(255 255 255 / 0.25);
  color: #111;
  border: none;
  border-radius: 8px;
  padding: 10px;
  resize: vertical;
  outline: none;
  flex-grow: 1;
  min-height: 150px;
}

.json-textarea:focus {
  background: rgba(255 255 255 / 0.45);
  box-shadow: 0 0 0 3px rgba(0 123 255 / 0.5);
}

.error-message {
  color: #d93025;
  margin-top: 8px;
  font-weight: 600;
  font-size: 13px;
}

/* Show button when panel is hidden */
.show-btn {
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
</style>
