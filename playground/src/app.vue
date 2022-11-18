<script lang="tsx">
  import { defineComponent, ref } from "vue";
  import { HiItem, HiSelection, HiSwitch } from "hoci";

  export default defineComponent(() => {
    const selectedIndex = ref(2);
    const logs = ref<string[]>([]);

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

    const isChecked = ref(true);
    return () => {
      return <div class="w-full p-4">
        <HiSelection activateEvent="click" onChange={handleChange} v-model={selectedIndex.value} tag="div" itemClass="cursor-pointer px-2 py-1" class="flex space-x-4 items-center" activeClass="text-white bg-hex-f00">
          <HiItem value={1}>Item 1</HiItem>
          <HiItem value={2}>Item 2</HiItem>
          <HiItem value={3}>Item 3</HiItem>
        </HiSelection>
        <HiSwitch v-model={isChecked.value} class="mt-4 select-none" activeClass="text-hex-f00">Switch</HiSwitch>
        <div>当前选择:{selectedIndex.value}</div>
        <div class="mt-4"></div>
          <div>Console:</div>
          <div class="mt-2">
            {logs.value.map((log, index) => <div key={index}>{log}</div>)}
          </div>
      </div>;
    };
  });
</script>
