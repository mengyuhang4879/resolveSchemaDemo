import React from 'react'
import schema from './Schema'
import authStatus from './authStatus'
import Packages from './Packages'
import LowCodeAnalysis from '../components/LowCodeAnalysis'
import './index.css'

class LowCode extends React.Component {
    state = {
        //在流程设置也买你设置的权限
        authStatus,
        // 表单设计中拖拽的页面
        schema
    }

    getStatus = (componentItem, status) => {
        if (status === 'READONLY') componentItem.props.disabled = true
        if (status === 'HIDDEN') componentItem.condition = false
    }

    //递归解析schema
    resolveSchema = (schemaComponentsTree) => {
        if (schemaComponentsTree && schemaComponentsTree.length > 0) {
            schemaComponentsTree.forEach(v => {
                this.state.authStatus.forEach(vs => {
                    if (v.id === vs.id) {
                        this.getStatus(v, vs.fieldBehavior)
                    }
                })
                this.resolveSchema(v.children)
            })
        }
    }

    handleChange = () => {
        let {schema} = this.state;
        let schemaComponentsTree = schema.componentsTree[0].children || [];
        this.resolveSchema(schemaComponentsTree)
        this.setState((
            schema
        ))
        console.log(this.state.schema)
    }

    render() {
        return (
            <>
                <button onClick={this.handleChange}>点击根据权限更改状态</button>
                <div className="lowcode">
                    <LowCodeAnalysis projectSchema={this.state.schema} packages={Packages}/>
                </div>
            </>
        )
    }
}

export default LowCode