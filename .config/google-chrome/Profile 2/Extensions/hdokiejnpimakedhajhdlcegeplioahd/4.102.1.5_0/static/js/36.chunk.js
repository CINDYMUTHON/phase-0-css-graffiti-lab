(window.webpackJsonpwebClient=window.webpackJsonpwebClient||[]).push([[36],{1052:function(e,n,t){"use strict";t.r(n);var o=t(6),i=t(1),c=(t(0),t(801)),r=t(1352),a=t(929),u={id:0,type:"GenerateStrongPassword",visible:!0,completed:null,seenAt:null,color:r.a.BLUE},l={complete:jest.fn(),hideExpandedSkillInDrawer:jest.fn()};jest.mock("../../hooks/use-secondary-onboarding-actions",function(){return{useSecondaryOnboardingActions:function(){return l}}}),jest.mock("react-redux",function(){return Object(o.a)({},jest.requireActual("react-redux"),{useSelector:jest.fn().mockReturnValueOnce({settings:{features:{new_infield_design_for_onboarding:!1}}})})});var s=function(e){return Object(c.mount)(Object(i.jsx)(a.default,{skill:e,expanded:!0,fromAllSkillsDialog:!1}))};it("should render the GenerateStrongPassword component without crashing",function(){var e=s(u);expect(e).toHaveLength(1)}),top.ext={},it('should invoke the complete function after strong password generated and "All set" CTA clicked',function(){var e=s(u);e.find("input.password-input").simulate("click"),e.find(".action button.cta").simulate("click"),e.find("button.action-cta").simulate("click"),e.unmount(),expect(l.complete).toHaveBeenCalled(),expect(l.hideExpandedSkillInDrawer).toHaveBeenCalled()})},802:function(e,n){},803:function(e,n){},804:function(e,n){},805:function(e,n){}}]);