<script setup lang="ts">
import { House, UserRound, Printer, Plus } from 'lucide-vue-next';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { cn } from '../lib/utils';
import { DateFormatter, type DateValue, getLocalTimeZone } from '@internationalized/date';
import { Calendar as CalendarIcon } from 'lucide-vue-next';
import { ref, onMounted, watch } from 'vue';
import navigation from './navigation.vue';

const df = new DateFormatter('en-US', {
    dateStyle: 'long',
});
const items = ref([
    { bill_id: 1, product: '', price: '', },
]);

function updateAmount(item: { quantity: number; unitPrice: number }): number {
    return item.quantity * item.unitPrice;
}

function HomePage() {
    window.location.href = '/home';
}

function AccountPage() {
    window.location.href = '/account';
}

function PrintBill() {
    window.print();
    console.log('print');
}

function addItem() {
    items.value.push({
        quantity: null,
        description: null,
        unitPrice: null,
        amount: null,
    });
}
</script>

<template>
    <div id="layout">
        <navigation />
        <div id="data-section">
            <header>
                บุญผองวัศดุก่อสร้าง
            </header>
            <p>171 หมู่14 ถนน อุบล-ตระการ ตำบลไร่น้อย อำเภอเมืองอุบลราชธานี จังหวัดอุบลราชธานี</p>
            <section>
                <div class="relative flex flex-1 min-w-[300px]">
                    <input type="text" class="customername-input" v-model="customer_name">
                    <small class="absolute top-[-10px] left-2 px-1 bg-white">
                        Customer Name</small></input>
                </div>
                <Popover>
                    <PopoverTrigger as-child>
                        <button variant="outline" :class="cn(
                            'flex flex-row max-w-[300px] w-full h-[40px] items-center justify-start border-[1px] border-solid border-[#E5E7EB] rounded-[6px] px-4 text-left text-[14px]',
                            !value && 'text-muted-foreground',
                        )">
                            <CalendarIcon class="mr-2 h-4 w-4" />
                            {{ value ? df.format(value.toDate(getLocalTimeZone())) : "Pick a date" }}
                        </button>
                    </PopoverTrigger>
                    <PopoverContent class="w-auto p-0">
                        <Calendar v-model="value" initial-focus />
                    </PopoverContent>
                </Popover>
            </section>
            <div class="relative w-full">
                <input type="text" class="address-input" v-model="address" />
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
                        <tr v-for="(item, description) in select" :key="description">
                            <td><input type="number"
                                    class="input-item w-full max-w-12 px-1 appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    v-model="item.quantity"></td>
                            <td><input class="input-item w-full px-1" v-model="item.description"></td>
                            <td><input type="number"
                                    class="input-item w-full max-w-[74px] px-1 appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    v-model="item.unitPrice"></td>
                            <td><input class="input-item w-full max-w-[76px] px-1" :value="updateAmount(item)" readonly>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="flex self-end gap-2">
                <button
                    class="w-[90px] h-fit p-2 px-4 text-[14px] text-neutral-700 rounded-[6px] border border-neutral-700"
                    @click="HomePage">
                    Cancel
                </button>
                <button
                    class="w-[90px] h-fit p-2 px-4 text-[14px] bg-neutral-700 text-white rounded-[6px] border border-neutral-700"
                    @click="SaveDate">
                    Save
                </button>
            </div>
        </div>

        <div id="items-section">
            <header>
                Product
            </header>
            <section>
                <div class="relative flex flex-1 min-w-[300px]">
                    <input type="text" class="customername-input" v-model="customer_name">
                    <small class="absolute top-[-10px] left-2 px-1 bg-white">
                        Product</small></input>
                </div>
            </section>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>product</th>
                            <th>price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, description) in items" :key="description">
                            <td><input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"></td>
                            <td>
                                <p>abc</p>
                            </td>
                            <td>
                                <p>123</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<style>
#layout {
    display: flex;
    padding: 88px;
    padding-top: 44px;
    padding-bottom: 44px;
    justify-content: center;
    align-items: flex-start;
    gap: 12px;
    width: 100%;
    height: 100%;
    max-width: 1440px;
    max-height: 1024px;
}

#data-section {
    display: flex;
    padding: 28px;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    height: 100%;
    flex: 1 0 0;
    border-radius: 20px;
    background-color: white;
}

header {
    font-family: monospace;
    font-size: 32px;
    text-align: center;
}

p {
    font-family: monospace;
    text-align: center;
}

small {
    font-family: monospace;
    text-align: center;

}

section {
    width: 100%;
    display: flex;
    justify-content: space-around;
    gap: 8px;
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
    font-family: monospace;
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
    font-family: monospace;
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
    font-family: monospace;
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

#items-section {
    display: flex;
    padding: 28px;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    height: 100%;
    max-width: 400px;
    flex: 1 0 0;
    border-radius: 20px;
    background-color: white;
}
</style>