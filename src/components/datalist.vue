<script setup>
import { House, UserRound, Search, ReceiptText, Edit } from 'lucide-vue-next';
import Button from './button.vue';
import { ref } from 'vue';

const bills = ref([
  { bill_id: 1, name: 'John Doe', date: '2025-01-05', amount: '200' },
  { bill_id: 2, name: 'Jane Smith', date: '2025-01-04', amount: '150' },
  { bill_id: 3, name: 'Alice Johnson', date: '2025-01-03', amount: '300' },
]);

function HomePage() {
  window.location.href = '/home';
}

function AccountPage() {
  window.location.href = '/account';
}

function BillPage(bill_id) {
  window.location.href = `/bill/${bill_id}`;
}

function EditList() {}

function newBill() {
  window.location.href = `/bill/1`;
}

function handleText(text) {
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
            <div class="search">
                <Search class="search-icon" />
                <input type="text" placeholder="Search your customer"
                    @input="(event) => handleText(event.target.value)" />
            </div>
            <select>
                <option value="latest">Latest Bills</option>
                <option value="oldest">Oldest Bills</option>
                <option value="highest_amount">Highest Amount</option>
                <option value="lowest_amount">Lowest Amount</option>
            </select>
        </section>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Customer Name</th>
                        <th>Date</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(bill, id) in bills" :key="id" @click="BillPage(bill.bill_id)">
                        <td>{{ bill.name }}</td>
                        <td>{{ bill.date }}</td>
                        <td>{{ bill.amount }}.-</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <Button :icon="House" label="Home" :onClick="HomePage" class="absolute -right-16 top-16 hover:bg-neutral-100" />
        <Button :icon="UserRound" label="Account" :onClick="AccountPage" class="absolute -right-16 top-[12rem] hover:bg-neutral-100" />
        <Button :icon="ReceiptText" label="new Bill" :onClick="newBill" class="absolute -right-16 top-[20rem] hover:bg-neutral-100" />
        <Button :icon="Edit" label="Edit" :onClick="EditList" class="absolute -right-16 top-[28rem] hover:bg-neutral-100" />
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

section {
    display: flex;
    justify-content: space-around;
    gap: 8px;
}

.search-container {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 16px;
}

.search {
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    padding: 8px 12px 8px 20px;
    border: 1px solid #E5E7EB;
    border-radius: 6px;
    gap: 8px;

}

.search-icon {
    color: black;
}

.search input {
    width: 100%;
    font-size: 14px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    outline: none;
}

select {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #E5E7EB;
    border-radius: 6px;
    font-size: 14px;
    background: white;
    appearance: none;
    outline: none;
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
    text-align: left;
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
    padding: 12px;
    border-bottom: 1px solid #E5E7EB;
}

th {
    font-size: 16px;
    font-weight: bold;
    text-align: left;
}

td {
    font-size: 14px;
}

tbody {
    display: table-row-group;
}

tbody tr:hover {
    background-color: #f9fafb;
    cursor: pointer;
}
</style>