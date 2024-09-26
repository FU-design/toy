import { mount } from "@vue/test-utils";
import CardBox from "../../src/components/CardBox/CardBox.vue";
import { expect, it, describe } from "vitest";

describe('CardBox', () => {
  it('does not render a header element when showHeader is false', () => {
    const showHeader = false
    const wrapper = mount(CardBox, {
      props: {
        showHeader
      }
    })
    const header = wrapper.find('header')
    expect(header.exists()).toBe(showHeader)
  })

  it('renders default slot content when no content is provided', () => {
    const wrapper = mount(CardBox)

    expect(wrapper.find('p').exists()).toBe(true)
    expect(wrapper.find('p').text()).toContain('我是卡片')
  })

  it('renders custom header, body, and footer content via slots', () => {
    const wrapper = mount(CardBox, {
      slots: {
        header: '<h1>自定义头部</h1>',
        default: '<div class="content">自定义内容</div>',
        footer: '<button>确认</button>'
      }
    })
    expect(wrapper.find('p').exists()).toBe(false)
    expect(wrapper.find('h1').text()).toContain('自定义头部')
    expect(wrapper.find('.content').text()).toContain('自定义内容')
    expect(wrapper.find('button').text()).toContain('确认')
  })
})