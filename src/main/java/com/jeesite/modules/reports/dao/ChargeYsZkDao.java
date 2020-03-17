/**
 * Copyright (c) 2013-Now http://jeesite.com All rights reserved.
 */
package com.jeesite.modules.reports.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.jeesite.common.dao.CrudDao;
import com.jeesite.common.mybatis.annotation.MyBatisDao;
import com.jeesite.modules.reports.entity.ChargeYsZk;

/**
 * 应收账款表Entity
 * @author LY
 * @version 2019-10-31
 */
@MyBatisDao
public interface ChargeYsZkDao extends CrudDao<ChargeYsZk> {
	List<ChargeYsZk> findChargeYsZkDetail(ChargeYsZk entity);
	
	@Select("${sql}")
	List<ChargeYsZk> queryChargeYsZk(@Param("sql") String sql);
}