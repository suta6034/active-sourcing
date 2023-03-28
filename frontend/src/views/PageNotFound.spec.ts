import { mount } from '@vue/test-utils';
import {
    expect, it, describe,
} from '../../tests/drivers/vitest/utils';
import PageNotFound from './PageNotFound.vue';

describe.each([['', 'de', 'en']])('PageNotFound view', (lang) => {
    it(`should render the view correctly in the language '${lang}'`, () => {
        window.localStorage.setItem('locale', lang);
        const wrapper = mount(PageNotFound, {
            props: {},
        });
        const container = wrapper.find('.PageNotFound');
        expect(container.exists()).toBe(true);
        const header = container.find('.Header');
        expect(header.exists()).toBe(true);
        const link = header.find('routerlink');
        expect(link.exists()).toBe(true);
        expect(link.element.getAttribute('to')).toStrictEqual('/');
        const signInButton = link.find('button');
        expect(signInButton.exists()).toBe(true);
        expect(signInButton.element.classList.contains('float-right')).toBe(true);
        expect(signInButton.text()).toStrictEqual(!lang || lang === 'de' ? 'Anmelden' : 'Sign in');

        const content = container.find('.Content');
        expect(content.exists()).toBe(true);
        const icon = content.find('.PageNotFound .NoResult');
        expect(icon.exists()).toBe(true);
        const label = content.find('.PageNotFoundLabel');
        expect(label.exists()).toBe(true);
        expect(label.text()).toStrictEqual(!lang || lang === 'de'
            ? 'Seite wurde nicht gefunden' : 'Page was not found');
    });
});
