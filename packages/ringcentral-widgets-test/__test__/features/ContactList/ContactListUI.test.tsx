import {
  autorun,
  title,
  Scenario,
  Given,
  When,
  Then,
  Step,
  examples,
} from '@ringcentral-integration/test-utils';
import { AllContactSourceName } from 'ringcentral-integration/lib/contactHelper';
import { ContactListUI } from 'ringcentral-widgets/modules/ContactListUI';

const getMockModule = () => ({
  searchFilter: '',
  sourceFilter: AllContactSourceName,
  state: {},
  _dispatch: () => {},
  parentModule: {},
});

@autorun(test)
@title('ContactListUI Module "_updateFilters" action')
export class UpdateFilter extends Step {
  @examples(`
    | options                                                           | sourceFilter              | searchFilter |
    | { sourceFilter: '${AllContactSourceName}', searchFilter: 'Test' } | '${AllContactSourceName}' | 'Test'       |
    | { sourceFilter: 'company', searchFilter: '' }                     | 'company'                 | ''           |
    | { sourceFilter: 'personal', searchFilter: '123' }                 | 'personal'                | '123'        |
  `)
  run() {
    return (
      <Scenario desc="ContactListUI Module '_updateFilters' action">
        <Given
          desc="Create an ContactListUI instance with default value"
          action={(_: any, context: any) => {
            const contactListUI = new ContactListUI({} as any);
            expect(contactListUI._initialValue.sourceFilter).toBe(
              AllContactSourceName,
            );
            expect(contactListUI._initialValue.searchFilter).toBe('');
            context.instance = contactListUI;
          }}
        />
        <When
          desc="Call ContactListUI '_updateFilters' action"
          action={(_: any, context: any) => {
            context.mockModule = getMockModule();
            context.instance._updateFilters.call(
              context.mockModule,
              context.example.options,
            );
          }}
        />
        <Then
          desc="Check value should be expected"
          action={(_: any, context: any) => {
            expect(context.mockModule.sourceFilter).toBe(
              context.example.sourceFilter,
            );
            expect(context.mockModule.searchFilter).toBe(
              context.example.searchFilter,
            );
          }}
        />
      </Scenario>
    );
  }
}
