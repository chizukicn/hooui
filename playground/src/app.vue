<script lang="tsx">
import { defineComponent, ref } from "vue";
import { HiItem, HiSelection } from "hoci";


export default defineComponent({
  setup() {
    const selectedIndex = ref<number[] | number>(2);
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


    return () => {
      return <div class="w-full p-4">
        <HiSelection
          onChange={handleChange}
          modelValue={selectedIndex.value}
          as="div"
          itemClass="duration-300 cursor-pointer px-2 py-1"
          class="flex space-x-4 items-center"
          activeClass="text-white bg-hex-f00"
          disabledClass="bg-gray-200 cursor-not-allowed line-through text-gray-500"
        >
          <HiItem value={1}>Item 1</HiItem>
          <HiItem value={2}>Item 2</HiItem>
          <HiItem disabled value={3}>Item 3</HiItem>
          <HiItem value={4}>Item 4</HiItem>
          <HiItem value={5}>Item 5</HiItem>
        </HiSelection>
      </div>;
    };
  }
});
</script>
