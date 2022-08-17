<template>
    <div class="emails">
        <HeaderAdmin />
        <MessageDetails v-if="this.showDetails" :emailID="messageDetailsID" @closeDetails="closeDetails()" />

        <div class="wrapper">
            <AdminSearchBar :searchTpye="'emails'" />
            <div class="emails-datepicker">
                <date-picker
                    v-model="date" range
                    :lang="this.lang"
                    :disabled-date="disabledAfterToday"
                    type="date"
                    valueType="format"
                    placeholder="Filter by date range..."
                    format="YYYY-MM-DD"
                    @change="dateChange"></date-picker>
                <button @click="searchByDates" class="emails-datepicker-submit">Search between dates</button>
            </div>
            <h4 class="count">Emails count: {{ emailsCount }}</h4>

            <!-- ALL emails -->
            <table class="emails_list" v-if="adminEmailsFilter.length == 0">
                <tr class="emails_list-headers">
                    <th>From</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Subject</th>
                    <th>Date</th>
                    <th>Operations</th>
                </tr>
                <tr class="emails_list-item" v-for="item in emails" :key="item.email_id" @click="openMessageDetails(item.email_id)">
                    <td class="emails_list-item__param">{{ item.from_email }}</td>
                    <td class="emails_list-item__param">{{ item.full_name }}</td>
                    <td v-if="item.username != null" class="emails_list-item__param">{{ item.username }}</td>
                    <td v-else class="emails_list-item__param"><i class="fas fa-question"></i></td>
                    <td class="emails_list-item__param">{{ item.subject }}</td>
                    <td class="emails_list-item__param">{{ item.sent_at }}</td>

                    <td class="emails_list-item__actions">
                        <button
                            @click="deleteMessage(item.email_id)"
                            class="emails_list-item__actions-btn delete"><i class="fas fa-trash"></i> DELETE
                        </button>
                        <button
                            @click="setStatus(item.email_id, true)"
                            v-if="item.is_seen == 0"
                            class="emails_list-item__actions-btn unread"><i class="fas fa-eye"></i> UNREAD
                        </button>
                        <button
                            @click="setStatus(item.email_id, false)"
                            v-else-if="item.is_seen == 1"
                            class="emails_list-item__actions-btn seen"><i class="fas fa-check"></i> SEEN
                        </button>
                    </td>
                </tr>
            </table>

            <!-- FILTERED EMAIL -->
            <table class="emails_list" v-if="adminEmailsFilter.length > 0">
                <tr class="emails_list-headers">
                    <th>From</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Subject</th>
                    <th>Date</th>
                    <th>Operations</th>
                </tr>
                <tr class="emails_list-item" v-for="item in filterMessages(adminEmailsFilter)" :key="item.email_id" @click="openMessageDetails(item.email_id)">
                    <td class="emails_list-item__param">{{ item.from_email }}</td>
                    <td class="emails_list-item__param">{{ item.full_name }}</td>
                    <td v-if="item.username != null" class="emails_list-item__param">{{ item.username }}</td>
                    <td v-else class="emails_list-item__param"><i class="fas fa-question"></i></td>
                    <td class="emails_list-item__param">{{ item.subject }}</td>
                    <td class="emails_list-item__param">{{ item.sent_at }}</td>

                    <td class="emails_list-item__actions">
                        <button
                            @click="deleteMessage(item.email_id)"
                            class="emails_list-item__actions-btn delete"><i class="fas fa-trash"></i> DELETE
                        </button>
                        <button
                            @click="setStatus(item.email_id, true)"
                            v-if="item.is_seen == 0"
                            class="emails_list-item__actions-btn unread"><i class="fas fa-eye"></i> UNREAD
                        </button>
                        <button
                            @click="setStatus(item.email_id, false)"
                            v-else-if="item.is_seen == 1"
                            class="emails_list-item__actions-btn seen"><i class="fas fa-check"></i> SEEN
                        </button>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import HeaderAdmin from "@/components/admin/HeaderAdmin.vue";
import MessageDetails from "@/components/admin/MessageDetails.vue";
import AdminSearchBar from "@/components/admin/AdminSearchBar.vue";
import Axios from "axios";
import { mapGetters, mapState } from "vuex";

    export default {
        name: "AdminEmails",
        components: {
            HeaderAdmin,
            MessageDetails,
            AdminSearchBar,
            DatePicker
        },
        data() {
            return {
                showDetails: false,
                messageDetailsID: null,
                dateSearchResults: [],
                date: null,
                lang: {
                    formatLocale: {
                        firstDayOfWeek: 1,
                    },
                    monthBeforeYear: false
                }
            }
        },
        computed: {
            ...mapState({
                emails: state => state.adminMessages,
                adminEmailsFilter: state => state.adminEmailsFilter,
            }),
            ...mapGetters({
                filterMessages: 'filterAdminMessages',
                emailsCount: 'getEmailsCount'
            }),
        },
        methods: {
            deleteMessage(messageID) {
                this.$store.dispatch("deleteMessage", messageID);
            },
            setStatus(messageID, status) {
                this.$store.dispatch("setMessageStatus", [messageID, status]);
            },
            openMessageDetails(ID) {
                this.messageDetailsID = ID;
                this.showDetails = true;
            },
            closeDetails() {
                this.showDetails = false;
            },
            disabledAfterToday(date) {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return date > today;
            },
            dateChange() {
                console.log(this.date[0]);
                console.log(this.date[1]);
            },
            async searchByDates() {
                await Axios.get(`${process.env.VUE_APP_API_URL}/admin/datediff`, { dateStart: this.date[0], dateEnd: this.data[1] })
                .then(response => {
                    
                    if(response.data.status) {
                        response.data.result.forEach(item => {
                            this.dateSearchResults = item;
                        });
                    }
                    if(response.data.status == null) {
                        console.log("NULL");
                    }
                    else if(!response.data.status) {
                        console.log("ERROR");
                    }
                })
                .catch(function (error) {
                    if (error.response.status >= 500 && error.response.status <= 599) {
                        commit('SET_SERVER_ERROR_STATUS', error.response);
                    }
                });
            }
        },
        mounted() {
            this.$store.dispatch("getMessages");
        }
    }
</script>

<style lang="scss">

.mx {
    &-datepicker-main {
        border-radius: 5px;
        color: $c-dark-theme;
        font-family: $c-main-font;
    }

    &-calendar {
        width: 300px;

        &-header {
            border-bottom: 1px solid $c-dark-theme;

            &-label {
                font-size: 18px;
            }

            .mx-btn {
                font-size: 18px;
                color: $c-6;

                i {
                    font-size: 26px;

                    &::before, &::after {
                        width: 12px;
                        height: 12px;
                    }
                }
            }
        }

        &-content {
            .mx-table {
                thead {
                    tr {
                        th {
                            font-size: 16px;
                            font-weight: 700;
                        }
                    }
                }

                tbody {
                    tr {
                        td {
                            &.cell {
                                font-size: 18px;
                                border-radius: 3px;

                                &:hover {
                                    background-color: $c-green-theme;
                                    color: $c-white;
                                }
                            }

                            &.today {
                                color: $c-white;
                                background-color: $c-blue;
                            }

                            &.active {
                                background-color: $c-green-theme;
                                color: $c-white;
                            }

                            &.in-range, &.hover-in-range {
                                background-color: rgba($c-green-theme, .3);
                                color: $c-3;
                            }

                            &.disabled {
                                color: $c-c;
                                background-color: $c-grayF3;

                                &:hover {
                                    color: $c-c;
                                    background-color: $c-grayF3;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

.emails {
    min-height: 100vh;
    padding-bottom: 40px;
    background-color: $c-3;

    &-datepicker {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin: 10px 0 30px;

        .mx-datepicker {
            width: 480px;

            .mx-input-wrapper {
                .mx-input {
                    height: 40px;
                    font-family: $c-main-font;
                    font-size: 18px;
                    color: $c-3;
                    padding: 6px 35px;
                    padding-left: 20px;
                }

                .mx-icon-clear, .mx-icon-calendar {
                    font-size: 22px;

                    svg {
                        width: 22px;
                        height: 22px;
                        fill: $c-3;
                    }
                }
            }
        }

        &-submit {
            margin-left: 20px;
            cursor: pointer;
            padding: 12px 18px;
            border: none;
            border-radius: 3px;
            letter-spacing: 1px;
            font-size: 12px;
            text-transform: uppercase;
            color: $c-white;
            font-weight: 900;
            background-color: $c-green-theme;
        }
    }

    .wrapper {
        padding: 60px 15px 0;
        position: relative;

        .count {
            color: $c-white;
            margin: 10px auto;
            letter-spacing: 2px;
        }
    }

    &_list {
        background-color: $c-e;
        width: 100%;
        margin: 15px 0;
        height: auto;
        border-collapse: collapse;

        &-headers {
            border-bottom: 4px solid $c-black;

            th {
                padding: 15px 0;
            }
        }

        &-item {
            background-color: transparent;
            border-bottom: 3px solid $c-3;
            transition: .2s ease-in-out;
            cursor: pointer;

            &:hover {
                background-color: $c-a;
            }

            &__param {
                padding: 15px 0;
                margin: 0 10px;
                font-size: 14px;
                font-weight: 600;
                color: $c-3;
                text-align: center;
            }

            &__actions {
                @include flexCenter();
                flex-direction: column;
                padding: 0 8px;

                &-btn {
                    cursor: pointer;
                    padding: 8px 0;
                    border: none;
                    border-radius: 3px;
                    font-size: 12px;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    margin: 8px 0;
                    color: $c-white;
                    font-family: $c-main-font;
                    font-weight: 700;
                    transition: .2s ease-in-out;
                    width: 100%;

                    &.delete {
                        background-color: $c-red;

                        &:hover {
                            background-color: $c-youtube;
                        }
                    }
                    &.unread {
                        background-color: $c-middleblue;

                        &:hover {
                            background-color: $c-blue;
                        }
                    }
                    &.seen {
                        background-color: $c-success;

                        &:hover {
                            background-color: $c-skyblue;
                        }
                    }

                    i {
                        font-size: 16px;
                        color: $c-white;
                    }
                }
            }
        }
    }
}
</style>