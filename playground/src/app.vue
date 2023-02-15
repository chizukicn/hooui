<script lang="tsx">
  import { defineComponent, reactive, ref } from "vue";
  import { HiItem, HiSelection, HiSwitch } from "hoci";

  export default defineComponent(() => {
    const selectedIndex = ref(2);
    const logs = ref<string[]>([]);

    const selectionState = reactive({
      multiple: false,
      clearable: false
    });

    function log(...args: any[]) {
      logs.value.push(args.map(r => {
        if (typeof r === "object") {
          return JSON.stringify(r);
        }
        return r;
      }).join(" "));

      // eslint-disable-next-line no-console
      console.log(...args);
    }

    function handleChange(index: number) {
      log("change", JSON.stringify(index));
      selectedIndex.value = index;
    }

    function clearLog() {
      logs.value.length = 0;
    }

    return () => {
      return <div class="w-full p-4">
      <HiSelection {...selectionState} activateEvent="click" onChange={handleChange} v-model={selectedIndex.value} tag="div" itemClass="duration-300 cursor-pointer px-2 py-1" class="flex space-x-4 items-center" activeClass="text-white bg-hex-f00">
        <HiItem value={1}>Item 1</HiItem>
        <HiItem value={2}>Item 2</HiItem>
        <HiItem value={3}>Item 3</HiItem>
      </HiSelection>
      <div class="flex space-x-4 items-center">
        <HiSwitch tag="span" v-model={selectionState.multiple} class="cursor-pointer mt-4 duration-200 select-none" activeClass="text-hex-f00">Multiple</HiSwitch>
        <HiSwitch tag="span" v-model={selectionState.clearable} class="cursor-pointer mt-4 duration-200 select-none" activeClass="text-hex-f00">Clearable</HiSwitch>
      </div>
      <div>Selected:{selectedIndex.value}</div>
      <div class="mt-4"></div>
      <div class="flex justify-between items-center">
        <div>Console: </div>
        <button onClick={clearLog} class="border-solid border-1 border-gray-50">Clear</button>
      </div>
      <div class="bg-gray-500 h-100 mt-2 text-white px-4 overflow-y-auto">
        {logs.value.map((log, index) => <div class="h-5 leading-5" key={index}>{log}</div>)}
      </div>
    </div>;
    };
  });
</script>
