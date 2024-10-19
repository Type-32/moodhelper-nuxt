<script setup lang="ts"></script>

<template>
  <ul class="timeline timeline-vertical">
    <li>
      <div class="timeline-start timeline-compact">
        {{ $t("docs.roadmap.v0-1-0.title") }}
        <span class="badge badge-primary">v0.1.0</span>
      </div>
      <div class="timeline-middle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="w-5 h-5 text-primary"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <div class="timeline-end timeline-box">
        <article class="prose">
          <h3>{{ $t("docs.roadmap.v0-1-0.basic_features") }}</h3>
          <ul>
            <li class="text-primary font-bold">
              {{ $t("docs.roadmap.v0-1-0.moodhelper_conversations") }}
            </li>
            <li class="text-primary font-bold">
              {{ $t("docs.roadmap.v0-1-0.public_moodhelper_api") }}
            </li>
            <li class="text-primary font-bold">
              {{ $t("docs.roadmap.v0-1-0.localization") }}
            </li>
            <li>{{ $t("docs.roadmap.v0-1-0.save_conversations") }}</li>
            <li>{{ $t("docs.roadmap.v0-1-0.sync_conversations") }}</li>
          </ul>
        </article>
      </div>
      <hr class="bg-primary" />
    </li>
    <li>
      <hr />
      <div class="timeline-start timeline-box">
        <article class="prose">
          <h3>{{ $t("docs.roadmap.v0-2-0.qol_features") }}</h3>
          <ul>
            <li>{{ $t("docs.roadmap.v0-2-0.model_selection") }}</li>
            <li>{{ $t("docs.roadmap.v0-2-0.prompt_tweaking") }}</li>
            <li>{{ $t("docs.roadmap.v0-2-0.more_params") }}</li>
            <li>{{ $t("docs.roadmap.more") }}</li>
          </ul>
        </article>
      </div>
      <div class="timeline-middle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="w-5 h-5"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <div class="timeline-end timeline-compact">
        {{ $t("docs.roadmap.v0-2-0.title") }} <span class="badge">v0.2.0</span>
      </div>
      <hr />
    </li>
    <li>
      <hr />
      <div class="timeline-start timeline-compact">
        {{ $t("docs.roadmap.pending_updates") }}
        <span class="badge">{{ $t("docs.roadmap.unknown") }}</span>
      </div>
      <div class="timeline-middle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="w-5 h-5"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <div class="timeline-end timeline-box">
        <article class="prose">
          <ul>
            <li>{{ $t("docs.roadmap.more") }}</li>
          </ul>
        </article>
      </div>
    </li>
  </ul>
</template>

<style scoped></style>
