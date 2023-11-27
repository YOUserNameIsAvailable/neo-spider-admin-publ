export function Login() {
    return (
        <div className="flex w-full h-full justify-center items-center">
            <style>
                {`
                  .login-page-component-class {
                    border-width: 1px;
                    border-style: solid;
                    border-color: #757575;
                    border-radius: 2px;
                  }
                  .login-page-input-button-class {
                    appearance: auto;
                    user-select: none;
                    align-items: flex-start;
                    text-align: center;
                    cursor: default;
                    box-sizing: border-box;
                    background-color: #EFEFEF;
                    color: black;
                    white-space: pre;
                    padding-block: 1px;
                    padding-inline: 6px;
                    border-width: 1px;
                    border-style: solid;
                    border-color: #505050;
                    border-image: initial;
                `}
            </style>
            <form>
                <div className="flex flex-col w-[400px] h-[381px] border-double border-[#5076c9] border-[3px]">
                    <div className="flex justify-center items-center text-white font-bold bg-[#5076c9] text-[11px] p-1"
                         style={{fontFamily: 'tahoma'}}>Authorization
                    </div>
                    <div className="w-full h-[190px] p-5"></div>
                    <div className="flex flex-col w-full h-[128px] p-1">
                        <div className="w-full h-[1px] bg-[#5076c9] my-[0.5em]"></div>
                        <div className="flex flex-row w-full">
                            <div className="flex w-[104px] p-[2px] justify-end items-center text-[11px] font-normal"
                                 style={{fontFamily: 'tahoma'}}>User Name:
                            </div>
                            <div className="w-[19px] h-[22px]"></div>
                            <div className="p-[2px]">
                                <input
                                    className="h-[19px] text-[11px] font-normal px-[2px] py-[1px] login-page-component-class"
                                    type="text" style={{width: '200px',}}/>
                            </div>
                        </div>
                        <div className="flex flex-row w-full">
                            <div className="flex w-[104px] p-[2px] justify-end items-center text-[11px] font-normal"
                                 style={{fontFamily: 'tahoma'}}>Password:
                            </div>
                            <div className="w-[19px] h-[22px]"></div>
                            <div className="p-[2px]">
                                <input
                                    className="h-[19px] text-[11px] font-normal px-[2px] py-[1px] login-page-component-class"
                                    type="text" style={{width: '200px',}}/>
                            </div>
                        </div>
                        <div className="flex flex-row w-full">
                            <div className="flex w-[104px] p-[2px] justify-end items-center text-[11px] font-normal"
                                 style={{fontFamily: 'tahoma'}}>Locale:
                            </div>
                            <div className="w-[19px] h-[21px]"></div>
                            <div className="flex justify-center items-center p-[2px]">
                                <select className="text-[11px] text-[#666] login-page-component-class" name="localeCode"
                                        style={{fontFamily: "돋움"}}>
                                    <option value="KR">KR</option>
                                    <option value="EN">EN</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-row w-full">
                            <div className="flex w-[104px] p-[2px] justify-end items-center text-[11px] font-normal"
                                 style={{fontFamily: 'tahoma'}}>Mode
                            </div>
                            <div className="w-[19px] h-[21px]"></div>
                            <div className="flex justify-center items-center p-[2px]">
                                <select className="text-[11px] text-[#666] login-page-component-class" name="mode"
                                        style={{fontFamily: "돋움"}}>
                                    <option value="html">Html</option>
                                    <option value="flex">Flex</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-row w-full justify-end gap-[2px]">
                            <input type="button"
                                   className="w-[120px] h-[19px] text-[11px] font-normal rounded-[2px] login-page-input-button-class hover:bg-[#e4e4e4]"
                                   style={{fontFamily: 'tahoma'}} value="Password Change"/>
                            <input type="button"
                                   className="w-[80px] h-[19px] text-[11px] font-normal rounded-[2px] login-page-input-button-class hover:bg-[#e4e4e4]"
                                   style={{fontFamily: 'tahoma'}} value="Login"/>
                            <input type="reset"
                                   className="w-[80px] h-[19px] text-[11px] font-normal rounded-[2px] login-page-input-button-class hover:bg-[#e4e4e4]"
                                   style={{fontFamily: 'tahoma'}} value="Reset"/>
                        </div>
                    </div>
                    <div className="p-1 border-t border-[#5076c9]">
                        <img src="/images/logo.gif" />
                    </div>
                </div>
                <div className="flex justify-center w-full my-[14px]">
                    <h2 className="font-weight"><a className="underline">다운로드 페이지 이동</a></h2>
                </div>
            </form>
        </div>
    );
}
