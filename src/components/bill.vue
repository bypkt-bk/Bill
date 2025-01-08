<script setup lang="ts">
import { House, UserRound, Printer, Plus } from 'lucide-vue-next';
import Buttons from './button.vue';
import { ref } from 'vue';
import { Calendar } from './ui/calendar';

import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { cn } from '../lib/utils';
import { DateFormatter, type DateValue, getLocalTimeZone } from '@internationalized/date';
import { Calendar as CalendarIcon } from 'lucide-vue-next';

const df = new DateFormatter('en-US', {
  dateStyle: 'long',
});

const value = ref<DateValue>();
const generateId = () => Math.random().toString(36).substr(2, 9);

const items = ref([
  { id: generateId(), quantity: 1, description: 'Item A', unitPrice: 100, amount: 200 },
  { id: generateId(), quantity: 2, description: 'Item B', unitPrice: 150, amount: 150 },
  { id: generateId(), quantity: 3, description: 'Item C', unitPrice: 100, amount: 300 },
]);

function updateAmount(item: { amount: number; quantity: number; unitPrice: number }) {
  return (item.amount = item.quantity * item.unitPrice);
}

function HomePage() {
  window.location.href = '/home';
}

function AccountPage() {
  window.location.href = '/account';
}

function SaveDate() {}

function PrintBill() {
  window.print();
  console.log('print');
}

function addItem() {
  items.value.push({
    id: generateId(),
    quantity: null,
    description: null,
    unitPrice: null,
    amount: null,
  });
}

function handleName(text: string) {
  console.log(text);
}

function handleAdress(text: string) {
  console.log(text);
}
</script>

<template>
    <div id="paper">
        <header>
            บุญผองวัศดุก่อสร้าง
        </header>
        <p>171 หมู่14 ถนน อุบล-ตระการ ตำบลไร่น้อย อำเภอเมืองอุบลราชธานี จังหวัดอุบลราชธานี</p>
        <section>
            <div class="relative flex flex-1 min-w-[300px]">
                <input type="text" class="customername-input" @onChange="handleName">
                <small class="absolute top-[-10px] left-2 px-1 bg-white">
                    Customer Name</small></input>
            </div>
            <Popover>
                <PopoverTrigger as-child>
                    <Button variant="outline" :class="cn(
                        'flex flex-row w-[180px] h-[40px] items-center justify-start border-[1px] border-solid border-[#E5E7EB] rounded-[6px] px-4 text-left text-[14px]',
                        !value && 'text-muted-foreground',
                    )">
                        <CalendarIcon class="mr-2 h-4 w-4" />
                        {{ value ? df.format(value.toDate(getLocalTimeZone())) : "Pick a date" }}
                    </Button>
                </PopoverTrigger>
                <PopoverContent class="w-auto p-0">
                    <Calendar v-model="value" initial-focus />
                </PopoverContent>
            </Popover>
        </section>
        <div class="relative">
            <input type="text" class="address-input" @onChange="handleAdress" />
            <small class="absolute top-[-10px] left-2 px-1 bg-white">Address</small>
        </div>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>จำนวน</th>
                        <th>รายการ</th>
                        <th>ราคา/หน่วย</th>
                        <th>รวม</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, id) in items" :key="id">
                        <td><input type="number"  class="input-item w-full max-w-12 px-1 appearance-none [&::-webkit-inner-spin-button]:appearance-none" v-model="item.quantity"></td>
                        <td><input class="input-item w-full px-1" v-model="item.description"></td>
                        <td><input type="number" class="input-item w-full max-w-[74px] px-1 appearance-none [&::-webkit-inner-spin-button]:appearance-none" v-model="item.unitPrice"></td>
                        <td><input class="input-item w-full max-w-[76px] px-1" :value="updateAmount(item)" readonly></td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>

                    </tr>

                </tbody>
            </table>
        </div>
        <div class="flex self-end gap-2">
            <button class="w-[90px] h-fit p-2 px-4 text-[14px] text-neutral-700 rounded-[6px] border border-neutral-700"
            @click="HomePage">
                Cancel
            </button>
            <button class="w-[90px] h-fit p-2 px-4 text-[14px] bg-neutral-700 text-white rounded-[6px] border border-neutral-700"
            @click="SaveDate">
                Save
            </button>
        </div>
    <Buttons :icon="House" label="Home" :onClick="HomePage"
    class="absolute -right-16 top-16 hover:bg-neutral-100" />
<Buttons :icon="UserRound" label="Account" :onClick="AccountPage"
    class="absolute -right-16 top-[12rem] hover:bg-neutral-100" />
<Buttons :icon="Printer" label="Print" :onClick="PrintBill"
    class="absolute -right-16 top-[20rem] hover:bg-neutral-100" />
<Buttons :icon="Plus" label="New items" :onClick="addItem"
    class="absolute -right-16 top-[28rem] hover:bg-neutral-100" />

    </div>

</template>

<style>
#paper {
    position: relative;
    background: white;
    height: 758px;
    padding: 28px;
    border-radius: 20px;
    border-color: #E5E7EB;
    border: 2px solid #E5E7EB;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

header {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 32px;
    text-align: center;
}

p {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    text-align: center;
}

small {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    text-align: center;

}

section {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
}

.customername-input {
    position: relative;
    width: 100%;
    height: 40px;
    padding: 8px 12px 8px 20px;
    border: 1px solid #E5E7EB;
    border-radius: 6px;
    min-width: 300px;
    font-size: 14px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    outline: none;
}

.address-input {
    position: relative;
    width: 100%;
    height: 40px;
    padding: 8px 12px 8px 20px;
    border: 1px solid #E5E7EB;
    border-radius: 6px;
    font-size: 14px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    outline: none;
    line-height: auto;
}

.table-container {
    width: 100%;
    height: 100%;
    border: 1px solid #E5E7EB;
    border-radius: 8px;
    overflow-y: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
    text-align: center;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
        Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

thead {
    background-color: #f3f4f6;
    position: sticky;
    top: 0;

}

th,
td {
    padding-top: 8px;
    padding-bottom: 8px;
    border-bottom: 1px solid #E5E7EB;
}

th {
    font-size: 14px;
    font-weight: bold;
    text-align: center;
}

td {
    font-size: 14px;
}

tbody {
    display: table-row-group;
}

.input-item {
    height: 32px;
    border: 1px solid #E5E7EB;
    border-radius: 6px;
}
</style>