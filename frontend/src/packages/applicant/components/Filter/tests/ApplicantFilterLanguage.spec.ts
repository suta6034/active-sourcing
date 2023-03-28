import { flushPromises, mount } from '@vue/test-utils';
import {
    expect,
    it,
    describe,
} from '../../../../../../tests/drivers/vitest/utils';
import ApplicantFilterLanguage from '../ApplicantFilterLanguage.vue';
import { allFiltersLabels } from '../../../repositories/filter-repository';

allFiltersLabels.value = [{
    name: 'languages',
    items: [
        {
            label: 'Deutsch',
            id: 1,
        },
        {
            label: 'Englisch',
            id: 2,
        },
        {
            label: 'Spanisch',
            id: 3,
        },
    ],
},
{
    name: 'languageLevels',
    items: [
        {
            label: 'Alle',
            id: 1,
        },
        {
            label: 'Grundkenntnisse',
            id: 2,
        },
        {
            label: 'Gut',
            id: 3,
        },
        {
            label: 'Fließend',
            id: 4,
        },
        {
            label: 'Muttersprache',
            id: 5,
        },
    ],
},
];

describe('Applicant Filter - Language', () => {
    it('should not render any item since it does not have any entries', async () => {
        const wrapper = mount(ApplicantFilterLanguage, {
            props: {},
        });
        // click on 'add language' button
        let addButton = wrapper.find('button.AddLanguage');
        expect(addButton.exists()).toBe(true);
        await addButton.trigger('click');
        // find language and level dropdown and check if they exist
        let languageButton = wrapper.find('.SelectLanguage button');
        expect(languageButton.exists()).toBe(true);
        let levelButton = wrapper.find('.SelectLevel button');
        expect(levelButton.exists()).toBe(true);
        expect(levelButton.text()).toStrictEqual('Alle');
        // level button has to be disabled if no language is selected
        expect((levelButton.element as HTMLButtonElement).disabled).toBe(true);
        // open language dropdown
        await languageButton.trigger('click');
        let languageList = wrapper.find('.SelectLanguage ul');
        expect(languageList.exists()).toBe(true);
        // get first item of list, which should be 'Deutsch'
        const germanItem = languageList.find('li');
        expect(germanItem.exists()).toBe(true);
        expect(germanItem.text()).toStrictEqual('Deutsch');
        // click on first item of language dropdown
        await germanItem.trigger('click');
        // language dropdown should now have the text 'Deutsch' and the level dropdown shouldn't be disabled anymore
        languageButton = wrapper.find('.SelectLanguage button');
        languageList = wrapper.find('.SelectLanguage ul');
        expect(languageButton.text()).toStrictEqual('Deutsch');
        expect(languageList.exists()).toBe(false);
        levelButton = wrapper.find('.SelectLevel button');
        expect((levelButton.element as HTMLButtonElement).disabled).toBe(false);
        // click on level button to open dropdown
        await levelButton.trigger('click');
        const levelList = wrapper.find('.SelectLevel ul');
        expect(levelList.exists()).toBe(true);
        // get 'Muttersprache' entry and click on it
        const motherTounge = levelList.findAll('li')[4];
        expect(motherTounge.exists()).toBe(true);
        expect(motherTounge.text()).toStrictEqual('Muttersprache');
        await motherTounge.trigger('click');
        levelButton = wrapper.find('.SelectLevel button');
        // text of level dropdown button should now be 'Muttersprache'
        expect(levelButton.text()).toStrictEqual('Muttersprache');
        // get button to delete entry
        const deleteButton = wrapper.find('button.DeleteEntry');
        expect(deleteButton.exists()).toBe(true);
        await deleteButton.trigger('click');
        languageButton = wrapper.find('.SelectLanguage button');
        levelButton = wrapper.find('.SelectLevel button');
        addButton = wrapper.find('button.AddLanguage');
        expect(languageButton.exists()).toBe(false);
        expect(levelButton.exists()).toBe(false);
        expect(addButton.exists()).toBe(true);
    });
    it('should not allow to add more than three language items', async () => {
        const wrapper = mount(ApplicantFilterLanguage, {
            props: {},
        });
        let addButton = wrapper.find('button.AddLanguage');
        expect(addButton.exists()).toBe(true);
        await addButton.trigger('click');
        expect(wrapper.findAll('.ApplicantFilterLanguageItem').length).toBe(1);
        addButton = wrapper.find('button.AddLanguage');
        expect(addButton.exists()).toBe(true);
        await addButton.trigger('click');
        expect(wrapper.findAll('.ApplicantFilterLanguageItem').length).toBe(2);
        addButton = wrapper.find('button.AddLanguage');
        expect(addButton.exists()).toBe(true);
        await addButton.trigger('click');
        expect(wrapper.findAll('.ApplicantFilterLanguageItem').length).toBe(3);
        addButton = wrapper.find('button.AddLanguage');
        expect(addButton.exists()).toBe(false);
    });
    it('should render the language filter with preselected languages', async () => {
        const wrapper = mount(ApplicantFilterLanguage, {
            props: {
                selected: [{ id: 2, levelId: 3 }, { id: 3 }, { }],
            },
        });
        await flushPromises();
        let addButton = wrapper.find('button.AddLanguage');
        let languageFilterItems = wrapper.findAll('.ApplicantFilterLanguageItem');
        expect(languageFilterItems.length).toBe(3);
        expect(addButton.exists()).toBe(false);
        // check entries
        expect(languageFilterItems[0].find('.SelectLanguage button').text()).toStrictEqual('Englisch');
        expect(languageFilterItems[0].find('.SelectLevel button').text()).toStrictEqual('Gut');
        expect((languageFilterItems[0].find('.SelectLevel button').element as HTMLButtonElement).disabled).toBe(false);

        expect(languageFilterItems[1].find('.SelectLanguage button').text()).toStrictEqual('Spanisch');
        expect(languageFilterItems[1].find('.SelectLevel button').text()).toStrictEqual('Alle');
        expect((languageFilterItems[1].find('.SelectLevel button').element as HTMLButtonElement).disabled).toBe(false);

        expect(languageFilterItems[2].find('.SelectLanguage button').text()).toStrictEqual('Sprache wählen');
        expect(languageFilterItems[2].find('.SelectLevel button').text()).toStrictEqual('Alle');
        expect((languageFilterItems[2].find('.SelectLevel button').element as HTMLButtonElement).disabled).toBe(true);

        // delete second entry and check if entries are still correct
        await languageFilterItems[1].find('button.DeleteEntry').trigger('click');
        languageFilterItems = wrapper.findAll('.ApplicantFilterLanguageItem');
        expect(languageFilterItems.length).toBe(2);

        expect(languageFilterItems[0].find('.SelectLanguage button').text()).toStrictEqual('Englisch');
        expect(languageFilterItems[0].find('.SelectLevel button').text()).toStrictEqual('Gut');
        expect((languageFilterItems[0].find('.SelectLevel button').element as HTMLButtonElement).disabled).toBe(false);

        expect(languageFilterItems[1].find('.SelectLanguage button').text()).toStrictEqual('Sprache wählen');
        expect(languageFilterItems[1].find('.SelectLevel button').text()).toStrictEqual('Alle');
        expect((languageFilterItems[1].find('.SelectLevel button').element as HTMLButtonElement).disabled).toBe(true);
        addButton = wrapper.find('button.AddLanguage');
        expect(addButton.exists()).toBe(true);
    });
    it('should be able to deselect a language', async () => {
        const wrapper = mount(ApplicantFilterLanguage, {
            props: {
                selected: [{ id: 2, levelId: 3 }, { id: 3 }, { }],
            },
        });
        await flushPromises();
        let languageFilterItem = wrapper.find('.ApplicantFilterLanguageItem');
        // check entries
        expect(languageFilterItem.find('.SelectLanguage button').text()).toStrictEqual('Englisch');
        expect(languageFilterItem.find('.SelectLevel button').text()).toStrictEqual('Gut');
        expect((languageFilterItem.find('.SelectLevel button').element as HTMLButtonElement).disabled).toBe(false);

        // select different language
        await languageFilterItem.find('.SelectLanguage button').trigger('click');
        await languageFilterItem.findAll('ul li')[0].trigger('click');
        languageFilterItem = wrapper.find('.ApplicantFilterLanguageItem');
        expect(languageFilterItem.find('.SelectLanguage button').text()).toStrictEqual('Deutsch');
        expect(languageFilterItem.find('.SelectLevel button').text()).toStrictEqual('Gut');

        // Deselect language
        await languageFilterItem.find('.SelectLanguage button').trigger('click');
        await languageFilterItem.findAll('ul li')[0].trigger('click');
        languageFilterItem = wrapper.find('.ApplicantFilterLanguageItem');
        expect(languageFilterItem.find('.SelectLanguage button').text()).toStrictEqual('Sprache wählen');
        expect(languageFilterItem.find('.SelectLevel button').text()).toStrictEqual('Alle');
        expect((languageFilterItem.find('.SelectLevel button').element as HTMLButtonElement).disabled).toBe(true);
    });
});
