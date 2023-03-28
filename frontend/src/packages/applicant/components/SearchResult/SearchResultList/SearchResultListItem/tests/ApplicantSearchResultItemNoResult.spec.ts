import { mount } from '@vue/test-utils';

import {
    describe,
    expect, it,
} from '../../../../../../../../tests/drivers/vitest/utils';

import ApplicantSearchResultItemNoResult from '../ApplicantSearchResultItemNoResult.vue';

describe('ApplicantSearchResultItemNoResult', () => {
    it('should render hints on how to improve search', () => {
        const wrapper = mount(ApplicantSearchResultItemNoResult, {});
        const notificationBox = wrapper.find('.ApplicantSearchResultItemNoResult');
        expect(notificationBox.exists()).toBe(true);
        expect(notificationBox.element.classList.contains('bg-info')).toBe(true);
        const header = notificationBox.find('.Header');
        expect(header.text()).toStrictEqual('Wir konnten keine Kandidat*innen für Ihre Suchanfrage finden.');
        const listHeading = notificationBox.find('.listHeading');
        expect(listHeading.text()).toStrictEqual('Folgende Tipps könnten für Sie hilfreich sein:');
        const list = notificationBox.find('ul');
        expect(list.exists()).toBe(true);
        const listElements = list.findAll('li');
        expect(listElements.length).toBe(4);
        expect(listElements[0].text()).toStrictEqual('Verwenden Sie allgemeinere Suchbegriffe');
        expect(listElements[1].text()).toStrictEqual('Überprüfen Sie die Schreibweise');
        expect(listElements[2].text()).toStrictEqual('Verwenden Sie weniger Filter');
        expect(listElements[3].text())
            .toStrictEqual('Das Kandidat*innen-Profil mit der gesuchten Profil-ID ist nicht mehr sichtbar geschalten');
    });
});
