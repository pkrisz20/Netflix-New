<template>
    <div class="emails">
        <HeaderAdmin />
        <MessageDetails v-if="this.showDetails" :emailID="messageDetailsID" @closeDetails="closeDetails()" />

        <div class="wrapper">
            <AdminSearchBar :searchTpye="'emails'" />
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
import HeaderAdmin from "@/components/admin/HeaderAdmin.vue";
import MessageDetails from "@/components/admin/MessageDetails.vue";
import AdminSearchBar from "@/components/admin/AdminSearchBar.vue";
import { mapGetters, mapState } from "vuex";

    export default {
        name: "AdminEmails",
        components: {
            HeaderAdmin,
            MessageDetails,
            AdminSearchBar
        },
        data() {
            return {
                showDetails: false,
                messageDetailsID: null
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
            }
        },
        mounted() {
            this.$store.dispatch("getMessages");
        }
    }
</script>

<style lang="scss" scoped>
.emails {
    min-height: 100vh;
    padding-bottom: 40px;
    background-color: $c-3;

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