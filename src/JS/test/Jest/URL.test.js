/*
 * @Descripttion: 
 * @version: 
 * @Author: matias tang
 * @Date: 2020-09-17 14:44:00
 * @LastEditors: matias tang
 * @LastEditTime: 2020-09-17 15:35:26
 */
import * as URL from '../../URL'

test('mtGetURLParameters test', () => {
    let testURL = 'https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1'
    let parameters = URL.mtGetURLParameters(testURL)
    expect(parameters).toEqual({ie: 'utf-8', f: '8', rsv_bp: '1'})
})