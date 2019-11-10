<template>
    <div class="app-container">
        <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
            <el-table-column align="center" label="ID" prop="id" width="90" />
            <el-table-column align="center" label="名称" prop="title" width="180" />
            <el-table-column align="center" label="时间" prop="date" width="180" />
            <el-table-column align="center" label="地点" prop="zone" width="180" />
            <el-table-column align="center" label="内容" prop="content" width="500" />
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="handleDelete(scope.row)">删除</el-button>
                    <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
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
                this.$api.activity.getActivity()
                    .then(res => {
                        console.log(res)
                        if (res.code === 200) {
                            this.list = res.data
                        } else if (res.code === 50001) {
                            this.$message({
                                message: '没有数据获取',
                                type: 'info'
                            })
                        }
                        this.listLoading = false
                    })
            },
            // 删除
            handleDelete(row) {
                this.$confirm('此操作将删除该活动, 是否继续?', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$api.activity.deleteActivity(row.id)
                        .then(res => {
                            if (res.code === 200) {
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                })
                                this.fetchData()
                            }
                        })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消删除'
                    })
                })
            },
            // 编辑
            handleEdit(row) {
                this.$router.push({
                    path: '/activity/index',
                    query: {
                        aid: row.id
                    }
                })
            }
        }
    }
</script>

<style>
</style>
