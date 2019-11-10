<template>
    <div class="app-container">
        <div style="margin-bottom: 25px;">
            <el-button type="primary" size="small" @click="start">开始约球</el-button>
            <el-button type="info" size="small" @click="end">结束约球</el-button>
        </div>
        <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
            <el-table-column align="center" label="ID" prop="id" width="180" />
            <el-table-column align="center" label="姓名" prop="name" width="200" />
            <el-table-column align="center" label="性别" prop="id" width="180" />
            <el-table-column align="center" label="QQ" prop="qq" width="200" />
            <el-table-column align="center" label="部门" prop="depart" width="200" />
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="handleClick(scope.row)">取消约球</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                list: null,
                listLoading: true
            }
        },
        created() {
            this.fetchData()
        },
        methods: {
            fetchData() {
                this.listLoading = true
                this.$api.ball.getBallList()
                .then(res => {
                    if (res.code === 200) {
                        this.list = res.data
                    } else if (res.code === 50001) {
                        this.$message({
                            message: '还没有人约球哦',
                            type: 'info'
                        })
                    }
                    this.listLoading = false
                })
            },
            start() {
                this.$api.ball.startOrder()
                .then(res => {
                    this.$message({
                        message: '已开启约球',
                        type: 'info'
                    })
                })
            },
            end() {
                this.$api.ball.endOrder()
                .then(res => {
                    this.$message({
                        message: '已停止约球',
                        type: 'info'
                    })
                })
            },
            // 取消约球
            handleClick(row) {
                console.log(row)
                this.$api.ball.cancelOrder(row.uuid)
                .then(res => {
                    if (res.code === 200) {
                        this.$message('取消成功')
                    }
                })
            }
        }
    }
</script>

<style>
</style>
