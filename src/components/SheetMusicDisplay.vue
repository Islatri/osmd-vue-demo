<template>
    <div class="bg-transparent">
        <div class="pt-12 px-4 sm:px-6 lg:px-8">
            <div class="max-w-6xl mx-auto">
                <!-- Header -->
                <div class="mb-6 flex items-center justify-between">
                    <div>
                        <h1 class="text-xl font-bold text-slate-900 dark:text-slate-100">
                            OpenSheetMusicDisplay Vue Demo
                        </h1>
                        <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            Select a sample and view the rendered music sheet
                        </p>
                    </div>
                    <button @click="toggleDarkMode" class="px-2 py-1 text-xs bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm
                     border border-slate-200/50 dark:border-slate-700/50 rounded
                     text-slate-900 dark:text-slate-100
                     hover:bg-blue-50/50 dark:hover:bg-slate-800/70 transition-colors">
                        {{ isDarkMode ? 'Light' : 'Dark' }}
                    </button>
                </div>

                <!-- Sample Selector -->
                <div class="mb-4">
                    <label class="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-2">
                        Select a sample:
                    </label>
                    <select v-model="selectedSample" @change="loadSelectedSample" class="w-full px-3 py-2 bg-white/70 dark:bg-slate-800/70
                   border border-slate-300/50 dark:border-slate-600/50 rounded
                   backdrop-blur-sm text-slate-900 dark:text-slate-100
                   placeholder-slate-400 dark:placeholder-slate-500
                   focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm">
                        <option value="">Select a sample...</option>
                        <option v-for="sample in samples" :key="sample.name" :value="sample.name">
                            {{ sample.name }}
                        </option>
                    </select>
                </div>

                <!-- Loading & Error States -->
                <div v-if="isLoading"
                    class="mb-4 p-3 bg-blue-50/50 dark:bg-blue-900/20 border border-blue-200/50 dark:border-blue-700/50 rounded text-xs text-blue-700 dark:text-blue-300">
                    Loading score...
                </div>

                <div v-if="error"
                    class="mb-4 p-3 bg-red-50/50 dark:bg-red-900/20 border border-red-200/50 dark:border-red-700/50 rounded text-xs text-red-700 dark:text-red-300">
                    {{ error }}
                </div>

                <!-- Controls Panel (visible only when a sample is selected) -->
                <div v-if="selectedSample" class="mb-4">
                    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                        <!-- Zoom Controls -->
                        <button @click="zoomOut" class="p-2 text-xs font-bold bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm
                     border border-slate-200/50 dark:border-slate-700/50 rounded
                     text-slate-900 dark:text-slate-100
                     hover:bg-blue-50/50 dark:hover:bg-slate-800/70 transition-colors">
                            - Zoom Out
                        </button>

                        <button @click="zoomIn" class="p-2 text-xs font-bold bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm
                     border border-slate-200/50 dark:border-slate-700/50 rounded
                     text-slate-900 dark:text-slate-100
                     hover:bg-blue-50/50 dark:hover:bg-slate-800/70 transition-colors">
                            + Zoom In
                        </button>

                        <div
                            class="p-2 text-xs bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded text-slate-900 dark:text-slate-100 flex items-center justify-center">
                            {{ (zoom * 100).toFixed(0) }}%
                        </div>

                        <!-- Cursor Controls -->
                        <button @click="showCursor" :class="[
                            'p-2 text-xs font-bold rounded transition-colors',
                            showCursorActive
                                ? 'bg-blue-600 text-white'
                                : 'bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 text-slate-900 dark:text-slate-100 hover:bg-blue-50/50 dark:hover:bg-slate-800/70'
                        ]">
                            Show
                        </button>

                        <button @click="hideCursor" class="p-2 text-xs font-bold bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm
                     border border-slate-200/50 dark:border-slate-700/50 rounded
                     text-slate-900 dark:text-slate-100
                     hover:bg-blue-50/50 dark:hover:bg-slate-800/70 transition-colors">
                            Hide
                        </button>

                        <button @click="moveCursorPrevious" class="p-2 text-xs font-bold bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm
                     border border-slate-200/50 dark:border-slate-700/50 rounded
                     text-slate-900 dark:text-slate-100
                     hover:bg-blue-50/50 dark:hover:bg-slate-800/70 transition-colors">
                            Prev
                        </button>

                        <button @click="moveCursorNext" class="p-2 text-xs font-bold bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm
                     border border-slate-200/50 dark:border-slate-700/50 rounded
                     text-slate-900 dark:text-slate-100
                     hover:bg-blue-50/50 dark:hover:bg-slate-800/70 transition-colors">
                            Next
                        </button>

                        <button @click="resetCursor" class="p-2 text-xs font-bold bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm
                     border border-slate-200/50 dark:border-slate-700/50 rounded
                     text-slate-900 dark:text-slate-100
                     hover:bg-blue-50/50 dark:hover:bg-slate-800/70 transition-colors">
                            Reset
                        </button>

                        <!-- Backend Select -->
                        <select :value="backendType"
                            @change="(e: Event) => setBackendType((e.target as HTMLSelectElement).value as any)"
                            class="p-2 text-xs bg-white/70 dark:bg-slate-800/70 border border-slate-300/50 dark:border-slate-600/50 rounded
                     backdrop-blur-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500">
                            <option value="svg">SVG</option>
                            <option value="canvas">Canvas</option>
                        </select>

                        <!-- Page Format -->
                        <select :value="pageFormat"
                            @change="(e: Event) => setPageFormat((e.target as HTMLSelectElement).value as any)"
                            class="p-2 text-xs bg-white/70 dark:bg-slate-800/70 border border-slate-300/50 dark:border-slate-600/50 rounded
                     backdrop-blur-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500">
                            <option value="Endless">Endless</option>
                            <option value="A3 P">A3 P</option>
                            <option value="A3 L">A3 L</option>
                            <option value="A4 P">A4 P</option>
                            <option value="A4 L">A4 L</option>
                            <option value="A5 P">A5 P</option>
                            <option value="A5 L">A5 L</option>
                        </select>

                        <!-- Transpose -->
                        <input :value="transposition"
                            @change="(e: Event) => setTransposition(parseInt((e.target as HTMLInputElement).value))"
                            type="number"
                            class="p-2 text-xs bg-white/70 dark:bg-slate-800/70 border border-slate-300/50 dark:border-slate-600/50 rounded
                     backdrop-blur-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="Transpose" min="-12" max="12" />

                        <!-- Debug Options -->
                        <label
                            class="p-2 text-xs flex items-center gap-2 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded cursor-pointer hover:bg-blue-50/50 dark:hover:bg-slate-800/70 transition-colors">
                            <input type="checkbox" :checked="drawSkyline" @change="toggleSkyline" class="w-3 h-3" />
                            <span class="text-slate-900 dark:text-slate-100">Skyline</span>
                        </label>

                        <label
                            class="p-2 text-xs flex items-center gap-2 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded cursor-pointer hover:bg-blue-50/50 dark:hover:bg-slate-800/70 transition-colors">
                            <input type="checkbox" :checked="drawBottomline" @change="toggleBottomline"
                                class="w-3 h-3" />
                            <span class="text-slate-900 dark:text-slate-100">Bottomline</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>

        <!-- Sheet Display Container -->
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div id="osmdCanvasDiv"
                class="bg-white dark:bg-white backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded overflow-auto p-4"
                style="min-height: 500px"></div>
        </div>

        <!-- Footer Info -->
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2 text-center">
            <p class="text-xs text-slate-500 dark:text-slate-400">
                OSMD Version: {{ osmdVersion }}
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { OpenSheetMusicDisplay } from 'opensheetmusicdisplay'
import { useSamples } from '@/composables/useSamples'
import { useSheetMusic } from '@/composables/useSheetMusic'

const { samples } = useSamples()
const {
    state,
    zoomIn,
    zoomOut,
    showCursor,
    hideCursor,
    moveCursorNext,
    moveCursorPrevious,
    resetCursor,
    setBackendType,
    setPageFormat,
    toggleSkyline,
    toggleBottomline,
    setTransposition,
    toggleDarkMode,
    initializeOSMD,
    loadScore,
} = useSheetMusic()

const selectedSample = ref('BrahWiMeSample')
const osmdVersion = ref('1.9.6')

const zoom = computed(() => state.zoom)
const isLoading = computed(() => state.isLoading)
const error = computed(() => state.error)
const isDarkMode = computed(() => state.isDarkMode)
const showCursorActive = computed(() => state.showCursor)
const backendType = computed(() => state.backendType)
const pageFormat = computed(() => state.pageFormat)
const transposition = computed(() => state.transposition)
const drawSkyline = computed(() => state.drawSkyline)
const drawBottomline = computed(() => state.drawBottomline)

onMounted(async () => {
    const canvasDiv = document.getElementById('osmdCanvasDiv')
    if (!canvasDiv) return

    try {
        initializeOSMD(canvasDiv, OpenSheetMusicDisplay)
        console.log('OSMD initialized successfully')
        // Load default sample after initialization
        await loadSelectedSample()
    } catch (e) {
        console.error('Failed to initialize OSMD:', e)
        state.error = 'Failed to initialize OSMD'
    }
})

const loadSelectedSample = async () => {
    if (!selectedSample.value || !state.osmdInstance) {
        return
    }

    try {
        // Find the sample file from the selected name
        const sampleObj = samples.find((s: { name: string; file: string }) => s.name === selectedSample.value)
        if (!sampleObj) return

        const scorePath = `/${sampleObj.file}`
        await loadScore(scorePath)
    } catch (e) {
        console.error('Failed to load sample:', e)
    }
}
</script>

<style scoped>
#osmdCanvasDiv {
    display: flex;
    justify-content: center;
    width: 100%;
}

:deep(> svg) {
    max-width: 100%;
    height: auto;
}
</style>
